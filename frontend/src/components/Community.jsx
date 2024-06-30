import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdOutlineSend } from "react-icons/md";
const Community = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [tweets, setTweets] = useState([]);

    const fetchTweets = async () => {
        try {
            const response = await axios.get('http://localhost:3001/tweets');
            setTweets(response.data);
        } catch (error) {
            console.error('Error fetching tweets:', error);
        }
    };

    useEffect(() => {
        fetchTweets();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/tweets', { name, message });
            setTweets([response.data, ...tweets]);
            setName('');
            setMessage('');
        } catch (error) {
            console.error('Error posting tweet:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
            <h1 className="text-4xl font-bold text-center my-8">Community Tweets</h1>
            <div className="max-w-2xl mx-auto my-8 space-y-4">
                {tweets.map((tweet) => (
                    <div key={tweet._id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                        <div className="flex items-center space-x-2">
                            <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
                                {tweet.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">{tweet.name}</h3>
                                <small className="text-gray-500 dark:text-gray-400">{new Date(tweet.timestamp).toLocaleString()}</small>
                            </div>
                        </div>
                        <p className="mt-2 text-gray-800 dark:text-gray-300">{tweet.message}</p>
                    </div>
                ))}
            </div>
            <div className="max-w-2xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700"
                    />
                    <textarea
                        placeholder="Your Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700"
                        rows="4"
                    ></textarea>
                    <button
                        type="submit"
                        className="w-full flex justify-center items-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Post
                        <MdOutlineSend className='ml-2 mt-0.5' />
                    </button>
                </form>
            </div>

        </div>
    );
};

export default Community;

