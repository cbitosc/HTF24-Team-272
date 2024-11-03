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
                    'Authorization': token,
                },
                body: JSON.stringify({ post }),
            });

            const data = await response.json();
            setResult(data);
            fetchHistory(); // Update history after analyzing
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchHistory = async () => {
        try {
            const response = await fetch('http://localhost:5000/history', {
                headers: {
                    'Authorization': token,
                },
            });
            const data = await response.json();
            setHistory(data);
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    };

    useEffect(() => {
        fetchHistory(); // Load history when component mounts
    }, []);

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
                    <p>Emotion: {result.emotion}</p>
                </div>
            )}
            <h3>Sentiment History</h3>
            {history.length === 0 ? (
                <p>No sentiment history available</p>
            ) : (
                <ul>
                    {history.map((item, index) => (
                        <li key={index}>
                            <strong>Post:</strong> {item.post} <br />
                            <strong>Score:</strong> {item.score} <br />
                            <strong>Emotion:</strong> {item.emotion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SentimentAnalysis;
