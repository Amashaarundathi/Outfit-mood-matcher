from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Outfit Mood Matcher API is running!", "endpoints": ["/recommend"]})

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