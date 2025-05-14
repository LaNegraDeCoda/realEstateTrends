import 'dotenv/config'; // Load environment variables
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch'; // ✅ Correct import for Node.js

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/transaction', async (req, res) => {
    const API_URL = 'https://api.gateway.attomdata.com/v4/transaction/salestrend?geoIdV4=6828b00047035292dd47fe020e636bb3&interval=yearly&startyear=2018&endyear=2022';
    const API_KEY = process.env.API_KEY; // Ensure this is set in `.env`

    try {
        const response = await fetch(API_URL, { 
            headers: { 'apikey': API_KEY } 
        });
        
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));