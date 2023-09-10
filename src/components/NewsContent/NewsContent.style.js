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
    borderLeftWidth: 8,
    elevation: 2,
  },
  item: {
    flex: 1,
  },
  news: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#515151',
  },
  category: {
    fontSize: 14,
    color: '#515151',
  },
});
