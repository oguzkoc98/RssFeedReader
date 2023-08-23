import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//pages
import NewsFeed from './pages/NewsFeed/NewsFeed';
import NewsSub from './pages/NewsSub/NewsSub';

const Tab = createBottomTabNavigator();

function Router() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelPosition: 'beside-icon',
          tabBarLabelStyle: {
            fontWeight: '800',
            fontSize: 18,
          },
          tabBarIconStyle: {display: 'none'},
          headerShown: false,
        }}>
        <Tab.Screen
          name="NewsFeedPage"
          component={NewsFeed}
          options={{tabBarLabel: 'Haber Akışı'}}
        />
        <Tab.Screen
          name="NewsSubPage"
          component={NewsSub}
          options={{tabBarLabel: 'Abonelik'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Router;
