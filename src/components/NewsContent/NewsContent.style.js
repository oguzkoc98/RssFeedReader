import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    borderRadius: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    // margin artık iconWrapper içinde
  },
  textContainer: {
    flex: 1,
  },
  category: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
    fontFamily: 'IBMPlexSans-Medium',
  },
  sourceName: {
    fontSize: 12,
    marginTop: 2,
    color: '#6B7280',
    fontWeight: '400',
    fontFamily: 'IBMPlexSans-Regular',
  },
  buttonContainer: {
    marginLeft: 12,
  },
});
