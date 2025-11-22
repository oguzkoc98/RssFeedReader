import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {Ionicons} from '@expo/vector-icons';

//context
import {SubscriptionProvider} from './context/SubscriptionContext';

// pages
import NewsFeed from './pages/NewsFeed/NewsFeed';
import NewsSub from './pages/NewsSub/NewsSub';
import NewsDetail from './pages/NewsDetail/NewsDetail';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function Router() {
  const [fontsLoaded, fontError] = useFonts({
    'IBMPlexSans-Bold': require('./assets/fonts/IBMPlexSans-Bold.ttf'),
    'IBMPlexSans-SemiBold': require('./assets/fonts/IBMPlexSans-SemiBold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  // NewsFeed için Stack Navigator
  function NewsFeedStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="NewsFeedList" component={NewsFeed} />
        <Stack.Screen
          name="NewsDetail"
          component={NewsDetail}
          options={{
            presentation: 'card',
            animation: 'slide_from_right',
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <SubscriptionProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarLabelPosition: 'beside-icon',
            tabBarActiveTintColor: '#2D2D2D',
            tabBarInactiveTintColor: '#868686',
            tabBarLabelStyle: {
              fontFamily: 'IBMPlexSans-SemiBold',
              fontSize: 16,
              fontWeight: '600',
              marginLeft: 18,
            },
            tabBarIconStyle: {
              marginRight: 0,
            },
            tabBarItemStyle: {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            },
            headerShown: false,
            tabBarStyle: {
              backgroundColor: '#FFFFFF',
              borderTopWidth: 1,
              borderTopColor: '#E8E8E8',
              paddingBottom: Platform.OS === 'ios' ? 28 : 8,
              paddingTop: 8,
              height: Platform.OS === 'ios' ? 84 : 64,
              elevation: 8,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: -2,
              },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            },
            tabBarSafeAreaInsets: {
              bottom: 0,
            },
          }}>
          <Tab.Screen
            name="NewsFeedPage"
            component={NewsFeedStack}
            options={{
              tabBarLabel: 'Haber Akışı',
              tabBarIcon: ({color, size, focused}) => (
                <Ionicons
                  name={focused ? 'newspaper' : 'newspaper-outline'}
                  size={20}
                  color={color}
                />
              ),
            }}
          />
          <Tab.Screen
            name="NewsSubPage"
            component={NewsSub}
            options={{
              tabBarLabel: 'Abonelik',
              tabBarIcon: ({color, size, focused}) => (
                <Ionicons
                  name={focused ? 'bookmark' : 'bookmark-outline'}
                  size={20}
                  color={color}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SubscriptionProvider>
  );
}

export default Router;
