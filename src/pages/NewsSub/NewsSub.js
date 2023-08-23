import React from 'react';
import {SafeAreaView, FlatList, Text} from 'react-native';
import NewsContent from '../../components/NewsContent/NewsContent';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs'; // Import the hook
import styles from './NewsSub.style';
import newsData from '../../data/news.json';

function NewsSub() {
  const tabBarHeight = useBottomTabBarHeight(); // Get the bottom tab bar height

  const renderItem = ({item}) => {
    return Object.keys(item.categories).map(category => (
      <NewsContent
        key={`${item.id}-${category}`}
        title={item.name}
        category={category}
        color={item.color}
      />
    ));
  };

  return (
    <SafeAreaView style={[styles.container, {marginBottom: tabBarHeight + 20}]}>
      <Text style={styles.text}>ABONELİKLER</Text>
      <FlatList
        data={newsData.news}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
}

export default NewsSub;
