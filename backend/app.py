from flask import Flask, request, jsonify
from flask_cors import CORS
from textblob import TextBlob

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/analyze', methods=['POST'])
def analyze_sentiment():
    data = request.get_json()
    post = data.get('post', '')
    analysis = TextBlob(post)
    sentiment = 'positive' if analysis.sentiment.polarity > 0 else 'negative' if analysis.sentiment.polarity < 0 else 'neutral'
    return jsonify({'sentiment': sentiment})

if __name__ == '__main__':
    app.run(debug=True)
