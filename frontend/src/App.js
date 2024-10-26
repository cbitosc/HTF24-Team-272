// src/App.js
import React, { useState } from 'react';
import './App.css';
import SentimentPieChart from './components/SentimentPieChart';

function App() {
    const [post, setPost] = useState('');
    const [result, setResult] = useState('');
    const [sentimentCounts, setSentimentCounts] = useState([0, 0, 0]); // [Positive, Negative, Neutral]

    const analyzePost = async () => {
        const response = await fetch('http://localhost:5000/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ post }),
        });
        const data = await response.json();
        setResult(data.sentiment);

        const newCounts = [...sentimentCounts];
        if (data.sentiment === 'Positive') newCounts[0] += 1;
        else if (data.sentiment === 'Negative') newCounts[1] += 1;
        else newCounts[2] += 1;

        setSentimentCounts(newCounts);
    };

    return (
        <div className="App">
            <h1>Sentiment Analysis Tool</h1>
            <input
                type="text"
                value={post}
                onChange={(e) => setPost(e.target.value)}
                placeholder="Enter your post"
            />
            <button onClick={analyzePost}>Analyze</button>
            {result && <div className="result">Sentiment: {result}</div>}
            <SentimentPieChart sentimentCounts={sentimentCounts} />
        </div>
    );
}

export default App;
