import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {SubscriptionContext} from '../../context/SubscriptionContext'; // Import the context
import styles from './SubsButton.style';

const SubsButton = ({url, name}) => {
  return (
    <SubscriptionContext.Consumer>
      {({subscriptionData, addSubscription}) => {
        const handlePress = () => {
          addSubscription(url, name);
        };

        const isSubscribed = subscriptionData.some(item => item.url === url);
        const buttonBackgroundColor = isSubscribed ? '#414141' : '#F4F4F4';
        const buttonText = isSubscribed ? 'Çık' : 'Abone Ol';
        const buttonTextColor = isSubscribed ? 'white' : '#5C5C5C';

        return (
          <TouchableOpacity
            style={[styles.button, {backgroundColor: buttonBackgroundColor}]}
            onPress={handlePress}>
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
