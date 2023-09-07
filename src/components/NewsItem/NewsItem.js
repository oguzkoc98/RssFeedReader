import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

//render-html
import HTML from 'react-native-render-html';

//style
import styles from './NewsItem.style';

const NewsItem = ({title, description, link, source}) => {
  function handleClick() {
    console.log(link);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.source}>{source}</Text>
      <Text style={styles.title}>{title}</Text>
      <HTML source={{html: description}} contentWidth={300} />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleClick}>
          <Text style={styles.buttonText}>Detay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewsItem;
