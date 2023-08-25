import React, {createContext, useContext, useState} from 'react';

const SubscriptionContext = createContext();

function SubscriptionProvider({children}) {
  const [subscriptionData, setSubscriptionData] = useState([]);

  function addSubscription(url, name) {
    const index = subscriptionData.findIndex(item => item.url === url);
    if (index !== -1) {
      setSubscriptionData(subscriptionData.filter(item => item.url !== url));
    } else {
      setSubscriptionData([...subscriptionData, {url, name}]);
    }
  }
  console.log(subscriptionData);
  return (
    <SubscriptionContext.Provider value={{subscriptionData, addSubscription}}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export {SubscriptionContext, SubscriptionProvider};
