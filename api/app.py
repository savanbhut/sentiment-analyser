from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer

# Flask app
app = Flask(__name__)
CORS(app)  # React frontend se connect hone dega

# Model aur vectorizer load karo
model = joblib.load('../models/sentiment_model.pkl')
tfidf = joblib.load('../models/tfidf_vectorizer.pkl')

# Preprocessing setup
nltk.download('stopwords', quiet=True)
stop_words = set(stopwords.words('english'))
stop_words.discard('not')
stop_words.discard('no')
stop_words.discard('nor')

domain_stopwords = ['movie', 'film', 'one', 'show', 'watch',
                    'make', 'think', 'see', 'know', 'time',
                    'story', 'scene', 'character', 'people', 'thing']

stemmer = PorterStemmer()

# Clean function — same as notebook
def clean_text(text):
    text = re.sub(r'<.*?>', '', text)
    text = re.sub(r'http\S+', '', text)
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    text = text.lower()
    text = ' '.join([w for w in text.split() if w not in stop_words])
    text = ' '.join([w for w in text.split() if w not in domain_stopwords])
    text = ' '.join([stemmer.stem(w) for w in text.split()])
    return text

# Health check route
@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'API is running'})

# Predict route
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    
    if not data or 'review' not in data:
        return jsonify({'error': 'No review provided'}), 400
    
    review = data['review']
    
    if len(review.strip()) < 10:
        return jsonify({'error': 'Review too short'}), 400
    
    # Clean + predict
    cleaned = clean_text(review)
    vectorized = tfidf.transform([cleaned])
    prediction = model.predict(vectorized)[0]
    confidence = round(model.predict_proba(vectorized).max() * 100, 2)
    
    return jsonify({
        'sentiment': prediction,
        'confidence': confidence,
        'review_length': len(review.split())
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)