import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import { GoogleGenerativeAI } from '@google/generative-ai';
import https from 'https';
config();
const app = express();
const port = 3001;

const API_KEY = process.env.API_KEY; // Replace with your Geoapify API Key
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Tweet schema and model
const tweetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const Tweet = mongoose.model('Tweet', tweetSchema);

// Route for fetching nearest places
app.post('/nearest-places', async (req, res) => {
    const placeName = req.body.placeName;

    try {
        const placeResponse = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(placeName)}&apiKey=${API_KEY}`);
        const placeData = await placeResponse.json();

        if (!placeData.features || placeData.features.length === 0) {
            return res.status(404).json({ message: 'Place not found' });
        }

        const placeId = placeData.features[0].properties.place_id;

        const fetchPlaces = async (category) => {
            const response = await fetch(`https://api.geoapify.com/v2/places?categories=${category}&filter=place:${placeId}&limit=2&apiKey=${API_KEY}`);
            return response.json();
        };

        const [supermarketData, hospitalData, restaurantData, schoolData, parkingData] = await Promise.all([
            fetchPlaces('commercial.supermarket'),
            fetchPlaces('healthcare.hospital'),
            fetchPlaces('catering.restaurant'),
            fetchPlaces('education.school'),
            fetchPlaces('parking'),
        ]);

        res.json({
            supermarkets: supermarketData,
            hospitals: hospitalData,
            restaurants: restaurantData,
            schools: schoolData,
            parking: parkingData,
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route for Gemini AI
app.post('/gemini', async (req, res) => {
    const { prompt } = req.body;

    const introText = `Remember, I can only answer questions about cities, expenses, and public places. Keep your questions concise! I'll try my best to provide brief (within 5 lines) and informative responses. Let's explore!\n\n`;

    try {
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const result = await model.generateContent(introText + prompt);
        const response = await result.response;

        const responseText = response.text().split('\n').slice(0, 5).join('\n');

        res.json({ reply: responseText });
    } catch (error) {
        console.error('Error generating content with Gemini:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route for creating a new tweet
app.post('/tweets', async (req, res) => {
    const { name, message } = req.body;

    try {
        const newTweet = new Tweet({ name, message });
        await newTweet.save();
        res.status(201).json(newTweet);
    } catch (error) {
        console.error('Error saving tweet:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route for retrieving all tweets
app.get('/tweets', async (req, res) => {
    try {
        const tweets = await Tweet.find().sort({ timestamp: -1 });
        res.json(tweets);
    } catch (error) {
        console.error('Error fetching tweets:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
//Route for getting location
app.post('/getgeolocation', async (req, res) => {
    try {
        const { lat, long } = req.body.latlong;
        console.log(lat, long);

        const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=74c89b3be64946ac96d777d08b878d43`;

        https.get(url, (resp) => {
            let data = '';

            // A chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received.
            resp.on('end', () => {
                const result = JSON.parse(data);
                

                const response = result.results[0].components;
                
                const { village, county, state_district, state, postcode } = response;
                const location = `${state_district},${state}\n${postcode}`;
                const tunedlocation= location.substring(10,location.length);

                res.send({ location });
            });

        }).on("error", (err) => {
            console.error("Error: " + err.message);
            res.send("Server Error");
        });

    } catch (error) {
        console.error(error.message);
        res.send("Server Error");
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
