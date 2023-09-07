import React from 'react';
import {View, Image} from 'react-native';

// Style
import styles from './Logo.style';

function Logo({image}) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={image} />
    </View>
  );
}

export default Logo;
