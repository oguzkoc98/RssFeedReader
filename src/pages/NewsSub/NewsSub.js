import React from 'react';
import {SafeAreaView, View, FlatList, Image} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

//data
import newsData from '../../data/news.json';

//style
import styles from './NewsSub.style';

//component
import NewsContent from '../../components/NewsContent/NewsContent';
import Logo from '../../components/Logo/Logo';

//image
const icon = require('../../assets/owl.png');

function NewsSub() {
  const tabBarHeight = useBottomTabBarHeight();

  const renderItem = ({item}) => {
    return Object.keys(item.categories).map(category => (
      <NewsContent
        key={`${item.id}-${category}`}
        title={item.name}
        category={category}
        color={item.color}
        url={item.categories[category]}
      />
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.image}>
        <Logo image={icon} />
      </View>
      <FlatList
        data={newsData.news}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
}

export default NewsSub;
