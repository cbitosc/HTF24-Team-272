from flask import Flask, request, jsonify
from flask_cors import CORS
from textblob import TextBlob

app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze():
    post = request.json['post']
    sentiment = TextBlob(post).sentiment.polarity
    sentiment_label = 'Positive' if sentiment > 0 else 'Negative' if sentiment < 0 else 'Neutral'
    return jsonify({'sentiment': sentiment_label})

if __name__ == '__main__':
    app.run(debug=True)
