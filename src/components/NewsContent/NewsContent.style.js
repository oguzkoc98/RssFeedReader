import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 6,
    borderBottomWidth: 1,
  },
  item: {
    flex: 1,
  },
  news: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  category: {
    fontSize: 14,
    color: '#515151',
  },
});
