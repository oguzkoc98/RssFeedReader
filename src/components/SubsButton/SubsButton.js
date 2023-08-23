import React, {useState} from 'react';
import {TouchableOpacity, Text} from 'react-native';

import styles from './SubsButton.style';

const SubsButton = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handlePress = () => {
    setIsSubscribed(prevState => !prevState);
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {backgroundColor: isSubscribed ? '#414141' : '#F4F4F4'},
      ]}
      onPress={handlePress}>
      <Text
        style={[
          styles.buttonText,
          {color: isSubscribed ? 'white' : '#5C5C5C'},
        ]}>
        {isSubscribed ? 'Çık' : 'Abone Ol'}
      </Text>
    </TouchableOpacity>
  );
};

export default SubsButton;
