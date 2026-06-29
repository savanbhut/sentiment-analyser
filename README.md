# 🎬 Sentiment Analyser

An end-to-end NLP project that predicts whether a movie review is **Positive** or **Negative** using Machine Learning, with a React frontend and Flask REST API.

![Python](https://img.shields.io/badge/Python-3.14-blue) ![Flask](https://img.shields.io/badge/Flask-3.1-green) ![React](https://img.shields.io/badge/React-Vite-purple) ![Accuracy](https://img.shields.io/badge/Accuracy-89%25-brightgreen)

---

## 📊 Model Performance

| Metric | Score |
|--------|-------|
| Accuracy | 89.13% |
| ROC-AUC | 0.9594 |
| Precision | 0.89 |
| Recall | 0.89 |
| F1-Score | 0.89 |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| ML Model | Scikit-learn, Logistic Regression |
| NLP | TF-IDF Vectorizer, NLTK |
| Backend | Flask, Flask-CORS |
| Frontend | React, Vite |
| Dataset | IMDB 50K Movie Reviews |

---

## 📁 Project Structure

sentiment-analyser/

├── api/

│   └── app.py              # Flask REST API

├── frontend/

│   └── src/

│       └── App.jsx         # React frontend

├── notebook/

│   └── sentiment_analyser.ipynb  # EDA + Model training

├── models/

│   ├── sentiment_model.pkl

│   └── tfidf_vectorizer.pkl

└── README.md
---

## 🚀 How to Run Locally

### 1. Clone the repo
```bash
git clone https://github.com/savanbhut/sentiment-analyser.git
cd sentiment-analyser
```

### 2. Setup Python environment
```bash
python -m venv venv
venv\Scripts\activate
pip install flask flask-cors scikit-learn nltk joblib pandas
```

### 3. Run Flask API
```bash
cd api
python app.py
```
API runs on `http://localhost:5000`

### 4. Run React Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

---

## 🔍 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Check API status |
| POST | `/predict` | Predict sentiment |

### Sample Request
```json
POST /predict
{
  "review": "This movie was absolutely amazing!"
}
```

### Sample Response
```json
{
  "sentiment": "positive",
  "confidence": 99.82,
  "review_length": 7
}
```

---

## 📈 Key Insights from EDA

- Dataset: 50,000 IMDB movie reviews — balanced (50% positive, 50% negative)
- Removed 418 duplicate reviews
- HTML tags (`<br />`) found and cleaned from raw reviews
- "not", "no", "nor" deliberately kept in stopwords — removing them reverses sentiment meaning
- Common words like "movie", "film" appear equally in both sentiments — removed as domain stopwords
- Porter Stemmer applied for root word normalization

---

## 👤 Author

**Bhut Savan** — Aspiring Data Scientist  
[LinkedIn](https://linkedin.com/in/savanbhut) • [GitHub](https://github.com/savanbhut)