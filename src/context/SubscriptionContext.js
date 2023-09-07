import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SubscriptionContext = createContext();

function SubscriptionProvider({children}) {
  const [subscriptionData, setSubscriptionData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await AsyncStorage.getItem('subscriptionData');
        if (data) {
          setSubscriptionData(JSON.parse(data));
        }
      } catch (error) {
        console.error('Veri alınamadı:', error);
      }
    };

    getData();
  }, []);
  console.log(subscriptionData);

  const addSubscription = async (url, name) => {
    const updatedData = [...subscriptionData];
    const index = updatedData.findIndex(item => item.url === url);
    if (index !== -1) {
      updatedData.splice(index, 1);
    } else {
      updatedData.push({url, name});
    }

    try {
      await AsyncStorage.setItem(
        'subscriptionData',
        JSON.stringify(updatedData),
      );
      setSubscriptionData(updatedData);
    } catch (error) {
      console.error('Veri kaydedilemedi:', error);
    }
  };

  return (
    <SubscriptionContext.Provider value={{subscriptionData, addSubscription}}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export {SubscriptionContext, SubscriptionProvider};
