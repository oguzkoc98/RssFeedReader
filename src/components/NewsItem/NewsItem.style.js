import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    marginHorizontal: 6,
    padding: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  source: {
    fontFamily: 'IBMPlexSans-Bold',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0077A8',
    marginBottom: 5,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  title: {
    fontFamily: 'IBMPlexSans-SemiBold',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2D2D2D',
  },
  description: {
    fontFamily: 'IBMPlexSans-Regular',
    fontSize: 16,
    marginBottom: 8,
    color: '#515151',
  },
  button: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: '#0077A8',
    fontWeight: 'bold',
  },
});
