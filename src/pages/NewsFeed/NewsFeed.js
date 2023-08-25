import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

//context
import {SubscriptionContext} from '../../context/SubscriptionContext';

//component
import NewsCard from '../../components/NewsCard/NewsCard';

//style
import styles from './NewsFeed.style';

function NewsFeed() {
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <SubscriptionContext.Consumer>
      {({subscriptionData}) => (
        <SafeAreaView
          style={[styles.container, {marginBottom: tabBarHeight + 20}]}>
          <Text style={styles.text}>HABER AKIŞI</Text>
          {subscriptionData.map((item, index) => (
            <NewsCard key={index} rssAdress={item.url} rssSource={item.name} />
          ))}
        </SafeAreaView>
      )}
    </SubscriptionContext.Consumer>
  );
}

export default NewsFeed;
