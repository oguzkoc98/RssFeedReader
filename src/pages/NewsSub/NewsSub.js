import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  FlatList,
  Platform,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';

//data
import newsData from '../../data/news.json';

//style
import styles from './NewsSub.style';

//component
import NewsContent from '../../components/NewsContent/NewsContent';

//context
import {SubscriptionContext} from '../../context/SubscriptionContext';

const NewsGroupItem = ({item, isExpanded, onToggle}) => {
  const categories = Object.keys(item.categories);
  const rotateAnim = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;
  const heightAnim = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(rotateAnim, {
        toValue: isExpanded ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(heightAnim, {
        toValue: isExpanded ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isExpanded, rotateAnim, heightAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={styles.newsGroup}>
      <TouchableOpacity
        onPress={onToggle}
        activeOpacity={0.7}
        style={[
          styles.groupHeader,
          {
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderBottomLeftRadius: isExpanded ? 0 : 8,
            borderBottomRightRadius: isExpanded ? 0 : 8,
          },
        ]}>
        <View style={styles.titleContainer}>
          <View style={[styles.colorDot, {backgroundColor: item.color}]} />
          <Text style={styles.groupTitle}>
            {item.name}
          </Text>
        </View>
        <Animated.View style={{transform: [{rotate}]}}>
          <Ionicons
            name="chevron-down"
            size={20}
            color="#9CA3AF"
            style={styles.chevronIcon}
          />
        </Animated.View>
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.categoriesContainer,
          {
            maxHeight: heightAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1000],
            }),
            opacity: heightAnim,
            overflow: 'hidden',
          },
        ]}>
        {categories.map(category => (
          <NewsContent
            key={`${item.id}-${category}`}
            title={item.name}
            category={category}
            color={item.color}
            url={item.categories[category]}
          />
        ))}
      </Animated.View>
    </View>
  );
};

function NewsSub() {
  const insets = useSafeAreaInsets();
  const [expandedItems, setExpandedItems] = useState({});
  const [activeTab, setActiveTab] = useState('sites'); // 'sites' veya 'myList'

  const toggleItem = itemId => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const renderItem = ({item}) => {
    return (
      <NewsGroupItem
        item={item}
        isExpanded={expandedItems[item.id] || false}
        onToggle={() => toggleItem(item.id)}
      />
    );
  };

  // Abone olunanları formatla (düz liste)
  const getFormattedSubscriptions = subscriptionData => {
    return subscriptionData.map((sub, index) => {
      // Name formatı: "Haber Sitesi - Kategori" veya sadece "Haber Sitesi"
      const parts = sub.name.split(' - ');
      const siteName = parts[0];
      const category = parts[1] || 'Tüm Haberler';

      // Haber sitesi rengini bul
      const newsSite = newsData.news.find(n => n.name === siteName);

      return {
        id: `sub-${index}`,
        title: siteName,
        category: category,
        color: newsSite?.color || '#6B7280',
        url: sub.url,
      };
    });
  };

  const renderMyListItem = ({item}) => {
    return (
      <NewsContent
        title={item.title}
        category={item.category}
        color={item.color}
        url={item.url}
      />
    );
  };

  const renderMyList = subscriptionData => {
    if (subscriptionData.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Ionicons name="list-outline" size={64} color="#D1D5DB" />
          <Text style={styles.emptyText}>Henüz abone olunan kaynak yok</Text>
          <Text style={styles.emptySubText}>
            Haber sitelerinden abone olmak için yukarıdaki tab'a geçin
          </Text>
        </View>
      );
    }

    const formattedSubs = getFormattedSubscriptions(subscriptionData);

    return (
      <FlatList
        data={formattedSubs}
        renderItem={renderMyListItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          paddingBottom: Platform.OS === 'ios' ? insets.bottom + 60 : 60,
          paddingHorizontal: 12,
          paddingTop: 8,
        }}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const Container = Platform.OS === 'web' ? View : SafeAreaView;

  return (
    <SubscriptionContext.Consumer>
      {({subscriptionData}) => (
        <Container
          style={styles.container}
          edges={Platform.OS === 'ios' ? ['top', 'left', 'right'] : ['top']}>
          {/* Tab Bar */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'sites' && styles.activeTab]}
              onPress={() => setActiveTab('sites')}
              activeOpacity={0.7}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'sites' && styles.activeTabText,
                ]}>
                Haber Siteleri
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'myList' && styles.activeTab]}
              onPress={() => setActiveTab('myList')}
              activeOpacity={0.7}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'myList' && styles.activeTabText,
                ]}>
                Benim Listem
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tab Content */}
          {activeTab === 'sites' ? (
            <FlatList
              data={newsData.news}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={{
                paddingTop: 12,
                paddingBottom: Platform.OS === 'ios' ? insets.bottom + 60 : 60,
                paddingHorizontal: 12,
              }}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            renderMyList(subscriptionData)
          )}
        </Container>
      )}
    </SubscriptionContext.Consumer>
  );
}

export default NewsSub;
