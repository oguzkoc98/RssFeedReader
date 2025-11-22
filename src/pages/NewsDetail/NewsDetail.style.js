import {StyleSheet, Platform} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  sourceName: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'IBMPlexSans-Bold',
  },
  category: {
    fontSize: 13,
    marginTop: 2,
    fontFamily: 'IBMPlexSans-Regular',
  },
  externalButton: {
    padding: 8,
    marginRight: -8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    lineHeight: 32,
    marginBottom: 16,
    fontFamily: 'IBMPlexSans-Bold',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
    fontFamily: 'IBMPlexSans-Regular',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 24,
    backgroundColor: '#F3F4F6',
  },
  contentContainer: {
    marginBottom: 20,
  },
  htmlBase: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    fontFamily: 'IBMPlexSans-Regular',
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'IBMPlexSans-Regular',
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
  },
  websiteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(249, 250, 251, 0.85)',
    borderWidth: 0.5,
    borderColor: 'rgba(229, 231, 235, 0.6)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  websiteButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
    marginRight: 4,
    fontFamily: 'IBMPlexSans-SemiBold',
  },
});

