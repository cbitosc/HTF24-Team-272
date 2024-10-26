const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for analysis history
let history = [];

// Example sentiment analysis function (using Vader or similar)
// Replace this with your actual sentiment analysis logic
const analyzeSentiment = (text) => {
    // Simulated analysis with a random score for demonstration
    const score = Math.random() * 2 - 1; // Simulating a score between -1 and 1
    const comparative = score; // In a real scenario, this might be calculated differently
    let sentiment = 'Neutral';

    // Categorize sentiment based on score
    if (score > 0.5) {
        sentiment = 'Positive';
    } else if (score < -0.5) {
        sentiment = 'Negative';
    } else {
        sentiment = 'Neutral';
    }

    return { score: score.toFixed(2), comparative: comparative.toFixed(2), sentiment };
};


// POST endpoint for sentiment analysis
app.post('/analyze', (req, res) => {
    const { post } = req.body;

    if (!post) {
        return res.status(400).json({ error: 'Post content is required' });
    }

    const result = analyzeSentiment(post);
    
    // Save to history
    history.push({ post, ...result });
    
    // Send response back to the frontend
    res.json(result);
});

// GET endpoint for sentiment history
app.get('/history', (req, res) => {
    res.json(history);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
