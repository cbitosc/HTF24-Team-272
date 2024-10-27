const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const vader = require('vader-sentiment');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Initialize history array to store analyzed posts
let history = [];

// Endpoint for sentiment analysis
app.post('/analyze', (req, res) => {
    const { post } = req.body;

    if (!post) {
        return res.status(400).json({ error: 'Post text is required' });
    }

    // Analyze sentiment
    const analysis = vader.SentimentIntensityAnalyzer.polarity_scores(post);
    const score = analysis.compound;

    // Determine emotion
    let emotion;
    if (score >= 0.5) {
        emotion = 'Positive';
    } else if (score <= -0.5) {
        emotion = 'Negative';
    } else {
        emotion = 'Neutral';
    }

    // Create sentiment record
    const sentimentRecord = { post, score, comparative: analysis.compound, emotion };

    // Save to history
    history.push(sentimentRecord);

    res.json(sentimentRecord);
});

// Endpoint to retrieve sentiment analysis history
app.get('/history', (req, res) => {
    res.json(history);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
