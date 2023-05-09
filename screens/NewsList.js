import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { API_KEY } from '../config/ApiKey';
import Bookmark from './Bookmark';

const NewsList = () => {
  const [articles, setArticles] = useState([]);
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);

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
    const isBookmarked = bookmarkedArticles.some((article) => article.title === item.title);

    const toggleBookmark = () => {
      if (isBookmarked) {
        const updatedBookmarks = bookmarkedArticles.filter((article) => article.title !== item.title);
        setBookmarkedArticles(updatedBookmarks);
      } else {
        setBookmarkedArticles([...bookmarkedArticles, item]);
      }
    };

    return (
      <TouchableOpacity style={styles.articleContainer} onPress={() => console.log(item)}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.author}>Author: {item.author}</Text>
        <Text style={styles.publishedAt}>Published At: {item.publishedAt}</Text>
        <Bookmark isBookmarked={isBookmarked} onPress={toggleBookmark} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={articles} renderItem={renderItem} keyExtractor={(item) => item.title} />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 16,
  },
  articleContainer: {
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  author: {
    fontSize: 12,
    color: '#888',
  },
  publishedAt: {
    fontSize: 12,
    color: '#888',
  },
};

export default NewsList;
