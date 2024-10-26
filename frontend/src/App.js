import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import SentimentAnalysis from './components/SentimentAnalysis';
import './App.css';

const App = () => {
  return (
    <Router>
      <header>
        <h1>Sentiment Analysis Tool</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/analyze">Analyze Sentiment</a></li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/analyze" element={<SentimentAnalysis />} />
      </Routes>
    </Router>
  );
};

export default App;
