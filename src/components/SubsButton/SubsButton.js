import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

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
        const buttonText = isSubscribed ? 'Çık' : 'Abone Ol';
        const buttonTextColor = isSubscribed ? '#868686' : '#1E1E1E';

        return (
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={[styles.buttonText, {color: buttonTextColor}]}>
              {buttonText}
            </Text>
          </TouchableOpacity>
        );
      }}
    </SubscriptionContext.Consumer>
  );
};

export default SubsButton;
