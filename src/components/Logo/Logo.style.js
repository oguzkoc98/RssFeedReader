import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    maxWidth: width,
    alignItems: 'center',
    borderBottomWidth: 4,
    borderBottomColor: '#0077A8',
    paddingVertical: 8,
  },
  image: {
    width: 70,
    height: 70,
  },
});
