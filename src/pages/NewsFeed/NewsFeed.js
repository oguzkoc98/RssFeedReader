import React from 'react';
import {SafeAreaView, Image, View} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

// context
import {SubscriptionContext} from '../../context/SubscriptionContext';

// component
import NewsCard from '../../components/NewsCard/NewsCard';
import Logo from '../../components/Logo/Logo';

// style
import styles from './NewsFeed.style';

//image
const icon = require('../../assets/owl.png');

function NewsFeed() {
  return (
    <SubscriptionContext.Consumer>
      {({subscriptionData}) => (
        <SafeAreaView style={styles.container}>
          <View style={styles.image}>
            <Logo image={icon} />
          </View>
          {subscriptionData.map((item, index) => (
            <NewsCard key={index} rssAdress={item.url} rssSource={item.name} />
          ))}
        </SafeAreaView>
      )}
    </SubscriptionContext.Consumer>
  );
}

export default NewsFeed;
