import React from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';
import HTML from 'react-native-render-html';

import styles from './NewsItem.style';

const NewsItem = ({title, description, link, source}) => {
  function handleClick() {
    Linking.openURL(link);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <HTML source={{html: description}} contentWidth={300} />
      <View style={styles.footer}>
        <Text style={styles.source}>{source}</Text>
        <TouchableOpacity style={styles.button} onPress={handleClick}>
          <Text style={styles.buttonText}>Habere Git</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewsItem;
