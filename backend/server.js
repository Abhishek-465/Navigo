import express from 'express';
import fetch from 'node-fetch1';
import cors from 'cors';
import { config } from 'dotenv';
config();
const app = express();
const port = 3001;

const API_KEY = process.env.API_KEY; // Replace with your Geoapify API Key

app.use(express.json());
app.use(cors());

app.post('/nearest-places', async (req, res) => {
    const placeName = req.body.placeName;

    try {
        // Step 1: Get place ID from place name
        const placeResponse = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(placeName)}&apiKey=${API_KEY}`);
        const placeData = await placeResponse.json();

        if (!placeData.features || placeData.features.length === 0) {
            return res.status(404).json({ message: 'Place not found' });
        }

        const placeId = placeData.features[0].properties.place_id;

        // Step 2: Get the nearest places using the place ID
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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
