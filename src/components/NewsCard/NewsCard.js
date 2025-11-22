import React, {useEffect, useState, useCallback} from 'react';
import {FlatList, RefreshControl, Platform, View, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';

//api
import fetchRss from '../../api/fetchRss';

//component
import NewsItem from '../NewsItem/NewsItem';

//style
import styles from './NewsCard.style';

//utils
import {getCategoryFromSubscription} from '../../utils/getNewsColor';

// Tarih parse fonksiyonu
function parseDate(dateString) {
  if (!dateString) return new Date(0);

  try {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? new Date(0) : date;
  } catch (error) {
    return new Date(0);
  }
}

// Kaynak adını standart formata çevir (kategori bilgisini kaldır)
function getStandardSourceName(subscriptionName) {
  if (!subscriptionName) return 'Bilinmeyen Kaynak';

  // "CNN Türk - Spor" formatından sadece "CNN Türk" kısmını al
  const parts = subscriptionName.split(' - ');
  return parts[0].trim();
}

const NewsCard = ({subscriptionData}) => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const insets = useSafeAreaInsets();

  const loadData = useCallback(() => {
    // Abonelik yoksa veri yükleme
    if (!subscriptionData || subscriptionData.length === 0) {
      setData([]);
      return Promise.resolve();
    }

    const dataArray = [];

    return Promise.allSettled(
      subscriptionData.map(element => {
        return fetchRss(element.url).then(feed => {
          // Subscription name'den standart kaynak adını al
          const sourceName = getStandardSourceName(element.name);
          const category = getCategoryFromSubscription(element.name);

          return {
            ...feed,
            sourceName: sourceName,
            subscriptionName: element.name,
            category: category,
            subscriptionUrl: element.url,
          };
        });
      }),
    )
      .then(results => {
        // Tüm feed'leri işle (başarılı olanlar)
        results.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            const response = result.value;
            const tempData = [...response.items].map(item => {
              const timestamp = parseDate(item.pubDate).getTime();
              return {
                ...item,
                source: response.sourceName,
                category: response.category,
                pubDateTimestamp: timestamp,
                subscriptionUrl: response.subscriptionUrl,
                // imageUrl'yi koru (RSS feed'den geliyorsa)
                imageUrl: item.imageUrl || null,
              };
            });
            dataArray.push(...tempData);
          } else {
            console.error(
              `RSS feed hatası (${subscriptionData[index]?.name}):`,
              result.reason,
            );
          }
        });

        // Tarihe göre sırala (en yeni önce)
        // Tarih yoksa veya 0 ise en alta koy
        dataArray.sort((a, b) => {
          // Eğer birinin tarihi yoksa veya 0 ise, onu alta koy
          if (a.pubDateTimestamp === 0 && b.pubDateTimestamp === 0) {
            return 0; // İkisi de tarihsizse sıra önemli değil
          }
          if (a.pubDateTimestamp === 0) return 1; // a tarihsizse alta
          if (b.pubDateTimestamp === 0) return -1; // b tarihsizse alta

          // Her ikisi de tarihliyse, en yeni önce
          return b.pubDateTimestamp - a.pubDateTimestamp;
        });

        setData(dataArray);
      })
      .catch(error => {
        console.error('RSS feed genel hatası:', error);
        setData([]);
      });
  }, [subscriptionData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData().finally(() => {
      setRefreshing(false);
    });
  }, [loadData]);

  const renderItem = ({item}) => {
    return (
      <NewsItem
        title={item.title}
        description={item.description}
        link={item.link}
        source={item.source}
        category={item.category}
        pubDate={item.pubDate}
        imageUrl={item.imageUrl}
      />
    );
  };

  const bottomPadding = Platform.OS === 'ios' ? insets.bottom + 60 : 60;

  // Abonelik yoksa boş durum göster
  if (!subscriptionData || subscriptionData.length === 0) {
    return (
      <View style={[styles.emptyContainer, {paddingTop: insets.top + 100}]}>
        <Ionicons name="newspaper-outline" size={64} color="#D1D5DB" />
        <Text style={styles.emptyTitle}>Henüz abonelik yok</Text>
        <Text style={styles.emptySubtitle}>
          Haber sitelerinden abone olmak için{'\n'}Abonelik sekmesine gidin
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data || []}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.link}-${index}`}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{
        paddingBottom: bottomPadding,
        paddingTop: 12,
      }}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View style={[styles.emptyContainer, {paddingTop: 100}]}>
          <Ionicons name="refresh-outline" size={48} color="#D1D5DB" />
          <Text style={styles.emptyTitle}>Haberler yükleniyor...</Text>
        </View>
      }
    />
  );
};

export default NewsCard;
