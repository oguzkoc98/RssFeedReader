import React from 'react';
import {View, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

// context
import {SubscriptionContext} from '../../context/SubscriptionContext';

// component
import NewsCard from '../../components/NewsCard/NewsCard';

// style
import styles from './NewsFeed.style';

function NewsFeed() {
  const Container = Platform.OS === 'web' ? View : SafeAreaView;

  return (
    <SubscriptionContext.Consumer>
      {({subscriptionData}) => (
        <Container
          style={styles.container}
          edges={Platform.OS === 'ios' ? ['top', 'left', 'right'] : ['top']}>
          <NewsCard subscriptionData={subscriptionData} />
        </Container>
      )}
    </SubscriptionContext.Consumer>
  );
}

export default NewsFeed;
