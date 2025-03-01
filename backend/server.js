const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Define the Destination Schema
const destinationSchema = new mongoose.Schema({
    city: String,
    country: String,
    clues: [String],
    fun_fact: [String],
    trivia: [String],
});

// Create the Destination Model
const Destination = mongoose.model('Destination', destinationSchema);

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-latest' });

// Function to generate new destinations
async function generateDestinations() {
    const existingDestinations = await Destination.find({}, 'city country').lean(); // Fetch existing cities and countries
    const existingCitiesCountries = existingDestinations.map(dest => `${dest.city}, ${dest.country}`);

    const prompt = `I have a JSON dataset of travel destinations with the following structure:
    [
        {
            "city": "Paris",
            "country": "France",
            "clues": [
                "This city is home to a famous tower that sparkles every night.",
                "Known as the 'City of Love' and a hub for fashion and art."
            ],
            "fun_fact": [
                "The Eiffel Tower was supposed to be dismantled after 20 years but was saved because it was useful for radio transmissions!",
                "Paris has only one stop sign in the entire city—most intersections rely on priority-to-the-right rules."
            ],
            "trivia": [
                "This city is famous for its croissants and macarons. Bon appétit!",
                "Paris was originally a Roman city called Lutetia."
            ]
        }
    ]

    The current destinations in the dataset are: ${existingCitiesCountries.join(', ')}.  When generating new destinations, ensure the 'city' and 'country' combinations are distinct from these existing examples. Prioritize lesser-known cities and countries and destinations that are not already in the dataset.
   Add 3 new destinations to this dataset, ensuring that each destination includes: city, country, two or three clues that are cryptic hints about the city, two fun_fact entries, and two trivia entries. The output should be valid JSON array. Don't include markdown formatting. Just valid json.`;

    try {
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // Parse the generated JSON
        try {
            const newDestinations = JSON.parse(responseText);
            return newDestinations;
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            console.error('Received JSON:', responseText);  // Log the actual JSON string
            return [];
        }
    } catch (error) {
        console.error('Error generating destinations:', error);
        return [];
    }
}

// API endpoint to generate and add new destinations
app.post('/api/generate-destinations', async (req, res) => {
    try {
        const newDestinations = await generateDestinations();

        if (newDestinations.length > 0) {
            const insertPromises = newDestinations.map(async (destination) => {
                // Normalize city values for case-insensitive comparison and remove whitespace
                const cityToSearch = destination.city.trim().toLowerCase();
                destination.city = cityToSearch;  // Update the destination object with the normalized city

                // Check if a destination with the same city already exists (case-insensitive)
                const existingDestination = await Destination.findOne({ city: { $regex: new RegExp(`^${cityToSearch}$`, 'i') } });

                if (!existingDestination) {
                    // If the destination doesn't exist, create a new document
                    const newDestination = new Destination(destination);
                    await newDestination.save();
                    return { status: 'inserted', city: destination.city };
                } else {
                    // If the destination already exists, skip insertion
                    return { status: 'skipped', city: destination.city };
                }
            });

            const results = await Promise.all(insertPromises);
            const inserted = results.filter(r => r.status === 'inserted').map(r => r.city);
            const skipped = results.filter(r => r.status === 'skipped').map(r => r.city);

            console.log('Inserted:', inserted);
            console.log('Skipped:', skipped);

            res.json({
                message: `Destinations processed. Inserted: ${inserted.length}, Skipped: ${skipped.length}`,
                inserted,
                skipped
            });


        } else {
            res.status(500).json({ error: 'Failed to generate destinations.' });
        }
    } catch (error) {
        console.error('Error generating or saving destinations:', error);
        res.status(500).json({ error: 'Failed to generate or save destinations.' });
    }
});

// API endpoint to get a random destination
app.get('/api/destination', async (req, res) => {
    try {
        const destinations = await Destination.find();
        if (destinations.length === 0) {
            return res.status(404).json({ error: 'No destinations available.' });
        }

        const randomIndex = Math.floor(Math.random() * destinations.length);
        res.json(destinations[randomIndex]);
    } catch (error) {
        console.error('Error fetching destinations:', error);
        res.status(500).json({ error: 'Failed to fetch destinations.' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});