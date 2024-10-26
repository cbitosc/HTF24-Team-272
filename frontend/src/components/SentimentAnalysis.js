import React, { useState, useEffect } from 'react';

const SentimentAnalysis = ({ token }) => {
    const [post, setPost] = useState('');
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!post) return;

        try {
            const response = await fetch('http://localhost:5000/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token, // Add token to the request headers
                },
                body: JSON.stringify({ post }),
            });

            const data = await response.json();
            setResult(data);
            fetchHistory(); // Fetch history after analyzing
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchHistory = async () => {
        try {
            const response = await fetch('http://localhost:5000/history', {
                headers: {
                    'Authorization': token, // Add token to the request headers
                },
            });
            const data = await response.json();
            setHistory(data);
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    };

    useEffect(() => {
        fetchHistory(); // Fetch history when component mounts
    }, []);

    const getSentimentLabel = (score) => {
        if (score > 0.5) return 'Positive';
        else if (score < -0.5) return 'Negative';
        return 'Neutral';
    };

    return (
        <div className="sentiment-analysis">
            <h2>Sentiment Analysis</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={post}
                    onChange={(e) => setPost(e.target.value)}
                    placeholder="Enter text to analyze..."
                />
                <button type="submit">Analyze</button>
            </form>
            {result && (
                <div>
                    <h3>Analysis Result</h3>
                    <p>Score: {result.score}</p>
                    <p>Comparative: {result.comparative}</p>
                    <p>Emotion: {getSentimentLabel(parseFloat(result.score))}</p>
                </div>
            )}
            <h3>Sentiment History</h3>
            <ul>
                {history.map((item, index) => (
                    <li key={index}>
                        <strong>Post:</strong> {item.post} <strong>Score:</strong> {item.score} <strong>Emotion:</strong> {getSentimentLabel(parseFloat(item.score))}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SentimentAnalysis;
