import React from 'react';
import {Text, View} from 'react-native';

//style
import styles from './NewsContent.style';

//component
import SubsButton from '../SubsButton/SubsButton';

const NewsContent = props => {
  return (
    <View style={[styles.container, {backgroundColor: props.color}]}>
      <View style={styles.item}>
        <Text style={styles.news}>{props.title}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.category}>/{props.category}</Text>
      </View>
      <View style={styles.item}>
        <SubsButton />
      </View>
    </View>
  );
};

export default NewsContent;
