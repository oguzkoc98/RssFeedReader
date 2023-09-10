import React from 'react';
import {View, Image} from 'react-native';

// style
import styles from './Logo.style';

function Logo({image}) {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
    </View>
  );
}

export default Logo;
