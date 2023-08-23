import React from 'react';
import {FlatList} from 'react-native';

//custom hook
import useRsssData from '../../hooks/useRssData';

//component
import NewsItem from '../NewsItem/NewsItem';

const NewsCard = ({rssAdress, rssSource}) => {
  const rssData = useRsssData(rssAdress);

  const renderItem = ({item}) => (
    <NewsItem
      key={item.id}
      title={item.title}
      description={item.description}
      link={item.link}
      source={rssSource}
    />
  );

  return (
    <FlatList
      data={rssData?.items || []}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default NewsCard;
