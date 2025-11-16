import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Image, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [mood, setMood] = useState(1);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRecommendations = async () => {
    setLoading(true);
    try {
      const url = 'http://localhost:5000/recommend';
      
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood_number: mood })
      });

      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setResults([]);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood-based Outfit Recommender</Text>

      <Picker selectedValue={mood} onValueChange={(val) => setMood(val)}>
        <Picker.Item label="Energetic" value={1} />
        <Picker.Item label="Calm" value={2} />
        <Picker.Item label="Professional" value={3} />
        <Picker.Item label="Romantic" value={4} />
        <Picker.Item label="Edgy" value={5} />
        <Picker.Item label="Casual" value={6} />
      </Picker>

      <Button title={loading ? "Loading..." : "Get Recommendations"} onPress={getRecommendations} />

      <FlatList
        data={results}
        keyExtractor={(item) => item.id || item.title}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 50 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#eee', padding: 10, borderRadius: 10, marginVertical: 10 },
  cardTitle: { fontSize: 18, fontWeight: 'bold' },
  image: { width: '100%', height: 150, borderRadius: 8 }
});