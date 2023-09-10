import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';

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
          {subscriptionData.length > 0 ? (
            subscriptionData.map((item, index) => (
              <NewsCard
                key={index}
                rssAdress={item.url}
                rssSource={item.name}
              />
            ))
          ) : (
            <View style={styles.noSubsContainer}>
              <Text style={styles.noSubsText}>
                Herhangi bir haber sitesine abone olmadınız!
              </Text>
            </View>
          )}
        </SafeAreaView>
      )}
    </SubscriptionContext.Consumer>
  );
}

export default NewsFeed;
