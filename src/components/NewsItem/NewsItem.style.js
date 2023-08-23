import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 12,
    margin: 6,
    borderRadius: 10,
    borderColor: '#0f79a3',
    backgroundColor: '#20BEFD',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#F0F0F0',
  },
  description: {
    flex: 1,
    fontSize: 20,
    marginBottom: 2,
    color: '#F6F6F6',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  source: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e9eced',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 22,
    backgroundColor: '#1BACE7',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
