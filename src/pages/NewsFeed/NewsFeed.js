import React from 'react';
import {SafeAreaView} from 'react-native';

// context
import {SubscriptionContext} from '../../context/SubscriptionContext';

// component
import NewsCard from '../../components/NewsCard/NewsCard';

// style
import styles from './NewsFeed.style';
import Logo from '../../components/Logo/Logo';

// image
const icon = require('../../assets/owl.png');

function NewsFeed() {
  return (
    <SubscriptionContext.Consumer>
      {({subscriptionData}) => (
        <SafeAreaView style={styles.container}>
          <Logo image={icon} />
          <NewsCard subscriptionData={subscriptionData} />
        </SafeAreaView>
      )}
    </SubscriptionContext.Consumer>
  );
}

export default NewsFeed;
