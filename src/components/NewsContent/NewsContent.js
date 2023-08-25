import React from 'react';
import {Text, View} from 'react-native';

//components
import SubsButton from '../SubsButton/SubsButton';

//style
import styles from './NewsContent.style';

const NewsContent = ({title, category, color, url}) => {
  return (
    <View style={[styles.container, {backgroundColor: color}]}>
      <View style={styles.item}>
        <Text style={styles.news}>{title}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.category}>/{category}</Text>
      </View>
      <View style={styles.item}>
        <SubsButton url={url} name={title} />
      </View>
    </View>
  );
};

export default NewsContent;
