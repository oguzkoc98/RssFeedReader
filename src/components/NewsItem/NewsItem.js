import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

// render-html
import HTML from 'react-native-render-html';

// style
import styles from './NewsItem.style';

// svg
import {SvgXml} from 'react-native-svg';

const detail = `<svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 0.8C0 0.587827 0.0684819 0.384344 0.190381 0.234315C0.312279 0.0842856 0.477609 0 0.65 0H12.35C12.5224 0 12.6877 0.0842856 12.8096 0.234315C12.9315 0.384344 13 0.587827 13 0.8C13 1.01217 12.9315 1.21566 12.8096 1.36569C12.6877 1.51571 12.5224 1.6 12.35 1.6H0.65C0.477609 1.6 0.312279 1.51571 0.190381 1.36569C0.0684819 1.21566 0 1.01217 0 0.8ZM0 4C0 3.78783 0.0684819 3.58434 0.190381 3.43431C0.312279 3.28429 0.477609 3.2 0.65 3.2H12.35C12.5224 3.2 12.6877 3.28429 12.8096 3.43431C12.9315 3.58434 13 3.78783 13 4C13 4.21217 12.9315 4.41566 12.8096 4.56569C12.6877 4.71571 12.5224 4.8 12.35 4.8H0.65C0.477609 4.8 0.312279 4.71571 0.190381 4.56569C0.0684819 4.41566 0 4.21217 0 4ZM0.65 6.4C0.477609 6.4 0.312279 6.48429 0.190381 6.63431C0.0684819 6.78434 0 6.98783 0 7.2C0 7.41217 0.0684819 7.61566 0.190381 7.76569C0.312279 7.91572 0.477609 8 0.65 8H8.45C8.62239 8 8.78772 7.91572 8.90962 7.76569C9.03152 7.61566 9.1 7.41217 9.1 7.2C9.1 6.98783 9.03152 6.78434 8.90962 6.63431C8.78772 6.48429 8.62239 6.4 8.45 6.4H0.65Z" fill="#0077A8"/>
</svg>
`;

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
          <View style={styles.buttonContainer}>
            <SvgXml xml={detail} style={styles.svg} />
            <Text style={styles.buttonText}>Detay</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewsItem;
