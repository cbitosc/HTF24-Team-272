// src/components/SentimentPieChart.js
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

function SentimentPieChart({ sentimentCounts }) {
    const data = [
        { name: 'Positive', value: sentimentCounts[0] },
        { name: 'Negative', value: sentimentCounts[1] },
        { name: 'Neutral', value: sentimentCounts[2] },
    ];

    const COLORS = ['#4caf50', '#f44336', '#ff9800'];

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h3>Sentiment Distribution</h3>
            <PieChart width={300} height={300}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
}

export default SentimentPieChart;
