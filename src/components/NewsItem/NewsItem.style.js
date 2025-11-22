import {StyleSheet, Platform} from 'react-native';

export default StyleSheet.create({
  container: {
    marginHorizontal: 12,
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  source: {
    fontFamily: 'IBMPlexSans-Bold',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  category: {
    fontFamily: 'IBMPlexSans-SemiBold',
    fontSize: 16,
    fontStyle: 'italic',
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
    marginBottom: 12,
    color: '#2D2D2D',
  },
  description: {
    fontFamily: 'IBMPlexSans-SemiBold',
    fontSize: 16,
    marginBottom: 12,
    color: '#515151',
  },
  descriptionContainer: {
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  dateText: {
    fontSize: 12,
    color: '#B0B0B0',
    fontFamily: 'IBMPlexSans-SemiBold',
    fontStyle: 'italic',
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#808080',
    fontWeight: '600',
    fontSize: 13,
  },
  chevronIcon: {
    marginLeft: 4,
  },
});
