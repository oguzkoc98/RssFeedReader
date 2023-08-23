import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    margin: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#20BEFD',
    borderRadius: 12,
  },
  item: {
    flex: 1,
  },
  news: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  category: {
    fontSize: 16,
    color: '#333333',
  },
});
