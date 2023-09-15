import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';

//api
import fetchRss from '../../api/fetchRss';

//component
import NewsItem from '../NewsItem/NewsItem';

const NewsCard = ({subscriptionData}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const dataArray = [];
    Promise.all(
      subscriptionData.map(element => {
        return fetchRss(element.url);
      }),
    ).then(responseArray => {
      responseArray.forEach(response => {
        const tempData = [...response.items].map(item => {
          return {...item, source: response.title};
        });
        dataArray.push(...tempData);
      });
      //order data
      setData(dataArray);
    });
  }, [subscriptionData]);

  const renderItem = ({item}) => {
    debugger;
    return (
      <NewsItem
        key={item.id}
        title={item.title}
        description={item.description}
        link={item.link}
        source={item.source}
      />
    );
  };

  return (
    <FlatList
      data={data || []}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default NewsCard;
