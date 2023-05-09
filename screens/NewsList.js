import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { API_KEY } from '../config/ApiKey';

const NewsList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
      );
      setArticles(response.data.articles);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          marginBottom: 16,
          backgroundColor: '#fff',
          padding: 12,
          borderRadius: 8,
          elevation: 2,
        }}
        onPress={() => console.log(item)}
      >
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>{item.title}</Text>
        <Text style={{ fontSize: 14, marginBottom: 8 }}>{item.description}</Text>
        <Text style={{ fontSize: 12, color: '#888' }}>Author: {item.author}</Text>
        <Text style={{ fontSize: 12, color: '#888' }}>Published At: {item.publishedAt}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
      />
    </View>
  );
};

export default NewsList;