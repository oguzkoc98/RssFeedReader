import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

// component
import NewsCard from '../../components/NewsCard/NewsCard';

// style
import styles from './NewsFeed.style';

function NewsFeed() {
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <SafeAreaView style={[styles.container, {marginBottom: tabBarHeight + 20}]}>
      <Text style={styles.text}>HABER AKIŞI</Text>
      <NewsCard
        rssAdress={'https://www.haberturk.com/rss/ekonomi.xml'}
        rssSource={'Habertürk'}
      />
    </SafeAreaView>
  );
}

export default NewsFeed;
