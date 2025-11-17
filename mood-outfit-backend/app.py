from flask import Flask, request, jsonify
from flask_cors import CORS
import hashlib
import json
import os

app = Flask(__name__)
CORS(app)

# Simple file-based user storage
USERS_FILE = 'users.json'

def load_users():
    if os.path.exists(USERS_FILE):
        with open(USERS_FILE, 'r') as f:
            return json.load(f)
    return {}

def save_users(users):
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f)

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Outfit Mood Matcher API is running!", "endpoints": ["/recommend", "/signup", "/login"]})

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400
    
    users = load_users()
    
    if email in users:
        return jsonify({"error": "User already exists"}), 400
    
    users[email] = {
        "password": hash_password(password),
        "created_at": "2024-01-01"
    }
    
    save_users(users)
    return jsonify({"message": "User created successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400
    
    users = load_users()
    
    if email not in users:
        return jsonify({"error": "Invalid credentials"}), 401
    
    if users[email]['password'] != hash_password(password):
        return jsonify({"error": "Invalid credentials"}), 401
    
    return jsonify({"message": "Login successful", "user": {"email": email}}), 200

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    mood_number = data.get('mood_number')
    
    moods = {
        1: "Energetic",
        2: "Calm", 
        3: "Professional",
        4: "Romantic",
        5: "Edgy",
        6: "Casual"
    }
    
    mood = moods.get(mood_number, "Casual")
    
    result = {
        "mood": mood,
        "styles": ["sporty", "bright"],
        "results": [
            {
                "title": f"{mood} Outfit",
                "description": "Perfect look for your mood",
                "reason": f"Matches your {mood.lower()} style",
                "image": "https://via.placeholder.com/200x150"
            }
        ]
    }
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, port=5000)