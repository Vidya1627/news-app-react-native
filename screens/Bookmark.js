import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Bookmark = ({ isBookmarked, onPress }) => (
  <TouchableOpacity
    style={{
      backgroundColor: '#eee',
      padding: 8,
      borderRadius: 4,
      marginTop: 8,
      ...(isBookmarked && { backgroundColor: '#ffca28' }),
    }}
    onPress={onPress}
  >
    <Text style={{ fontWeight: 'bold', color: '#333' }}>
      {isBookmarked ? 'Bookmarked' : 'Bookmark'}
    </Text>
  </TouchableOpacity>
);

export default Bookmark;
