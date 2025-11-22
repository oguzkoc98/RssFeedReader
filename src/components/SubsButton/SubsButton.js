import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

//context
import {SubscriptionContext} from '../../context/SubscriptionContext';

//style
import styles from './SubsButton.style';

const SubsButton = ({url, name}) => {
  return (
    <SubscriptionContext.Consumer>
      {({subscriptionData, addSubscription}) => {
        const handlePress = () => {
          addSubscription(url, name);
        };

        const isSubscribed = subscriptionData.some(item => item.url === url);

        return (
          <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
            <Text style={styles.buttonText}>
              {isSubscribed ? 'Abonelikten Çık' : 'Abone Ol'}
            </Text>
          </TouchableOpacity>
        );
      }}
    </SubscriptionContext.Consumer>
  );
};

export default SubsButton;
