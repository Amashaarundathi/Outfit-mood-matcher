# Outfit Mood Matcher

A React Native app that recommends outfits based on your current mood.

## Features
- Select from 6 different moods (Energetic, Calm, Professional, Romantic, Edgy, Casual)
- Get personalized outfit recommendations
- View outfit images and descriptions

## Setup
1. Install dependencies: `npm install`
2. Start the app: `npm start`
3. Run on Android: `npm run android`
4. Run on iOS: `npm run ios`

## Backend
The app connects to a Flask backend at `http://10.0.2.2:5000/recommend` (Android emulator).
For iOS simulator, change the URL to `http://localhost:5000/recommend`.