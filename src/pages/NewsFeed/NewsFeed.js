import React from 'react';
import {SafeAreaView, Text} from 'react-native';

//component
import NewsCard from '../../components/NewsCard/NewsCard';

//style
import styles from './NewsFeed.style';

function NewsFeed() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>HABER AKIŞI</Text>
      <NewsCard
        rssAdress={'https://www.haberturk.com/rss/ekonomi.xml'}
        rssSource={'Habertürk'}
      />
    </SafeAreaView>
  );
}

export default NewsFeed;
