import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: '#F3F4F6',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
    fontFamily: 'IBMPlexSans-Medium',
  },
  activeTabText: {
    color: '#1F2937',
    fontWeight: 'bold',
    fontFamily: 'IBMPlexSans-Bold',
  },
  newsGroup: {
    marginBottom: 12,
  },
  groupHeader: {
    padding: 18,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 10,
  },
  chevronIcon: {
    marginLeft: 8,
  },
  groupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    fontFamily: 'IBMPlexSans-Bold',
  },
  categoriesContainer: {
    backgroundColor: '#FAFAFA',
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginTop: 16,
    textAlign: 'center',
    fontFamily: 'IBMPlexSans-Bold',
  },
  emptySubText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
    fontFamily: 'IBMPlexSans-Regular',
  },
});
