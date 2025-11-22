import React, {useMemo, useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';
import HTML from 'react-native-render-html';
import {useNavigation} from '@react-navigation/native';

//utils
import {getNewsColor} from '../../utils/getNewsColor';
import {extractImageFromHtml} from '../../utils/extractImageFromHtml';
import {fetchArticleContent} from '../../utils/fetchArticleContent';

//style
import styles from './NewsDetail.style';

// Tarih formatlama fonksiyonu
function formatDate(dateString) {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';

    const day = date.getDate();
    const monthNames = [
      'Ocak',
      'Şubat',
      'Mart',
      'Nisan',
      'Mayıs',
      'Haziran',
      'Temmuz',
      'Ağustos',
      'Eylül',
      'Ekim',
      'Kasım',
      'Aralık',
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const dateHours = date.getHours().toString().padStart(2, '0');
    const dateMinutes = date.getMinutes().toString().padStart(2, '0');

    return `${day} ${month} ${year}, ${dateHours}:${dateMinutes}`;
  } catch (error) {
    return '';
  }
}

function NewsDetail({route}) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const {title, description, link, source, category, pubDate} = route.params || {};

  const [fullContent, setFullContent] = useState(null);
  const [loadingContent, setLoadingContent] = useState(false);

  const sourceColor = getNewsColor(source);
  const formattedDate = formatDate(pubDate);
  
  const imageUrl = useMemo(() => {
    // Önce route params'tan gelen imageUrl'yi kontrol et (RSS feed'den)
    if (route.params?.imageUrl) {
      return route.params.imageUrl;
    }
    // Sonra description'dan çıkar
    if (description) {
      return extractImageFromHtml(description);
    }
    // Son olarak fullContent'ten çıkar
    if (fullContent) {
      return extractImageFromHtml(fullContent);
    }
    return null;
  }, [description, route.params?.imageUrl, fullContent]);

  // Tam içeriği yükle - şimdilik sadece description kullan
  useEffect(() => {
    // RSS feed'den gelen description'ı direkt kullan
    // Web scraping CORS sorunlarına yol açabilir, bu yüzden şimdilik devre dışı
    setFullContent(description);
  }, [description]);

  const handleOpenWebsite = async () => {
    if (link) {
      try {
        const canOpen = await Linking.canOpenURL(link);
        if (canOpen) {
          await Linking.openURL(link);
        }
      } catch (error) {
        console.error('URL açılırken hata oluştu:', error);
      }
    }
  };

  const Container = Platform.OS === 'web' ? View : SafeAreaView;

  return (
    <Container
      style={styles.container}
      edges={Platform.OS === 'ios' ? ['top', 'left', 'right'] : ['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          {source && (
            <Text style={[styles.sourceName, {color: sourceColor}]}>
              {source}
            </Text>
          )}
          {category && (
            <Text style={[styles.category, {color: sourceColor}]}>
              {category}
            </Text>
          )}
        </View>
        {link && (
          <TouchableOpacity
            onPress={handleOpenWebsite}
            style={styles.externalButton}
            activeOpacity={0.7}>
            <Ionicons name="open-outline" size={20} color="#6B7280" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Title */}
        {title && <Text style={styles.title}>{title}</Text>}

        {/* Date */}
        {formattedDate && (
          <View style={styles.dateContainer}>
            <Ionicons name="time-outline" size={16} color="#6B7280" />
            <Text style={styles.dateText}>{formattedDate}</Text>
          </View>
        )}

        {/* Image */}
        {imageUrl && (
          <Image source={{uri: imageUrl}} style={styles.image} resizeMode="cover" />
        )}

        {/* Content */}
        {loadingContent ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6B7280" />
            <Text style={styles.loadingText}>İçerik yükleniyor...</Text>
          </View>
        ) : fullContent ? (
          <View style={styles.contentContainer}>
            <HTML
              source={{html: fullContent}}
              contentWidth={width - 32}
              baseStyle={styles.htmlBase}
            />
          </View>
        ) : description ? (
          <View style={styles.contentContainer}>
            <HTML
              source={{html: description}}
              contentWidth={width - 32}
              baseStyle={styles.htmlBase}
            />
          </View>
        ) : null}

        {/* Footer Spacing */}
        <View style={{height: insets.bottom + 20}} />
      </ScrollView>
    </Container>
  );
}

export default NewsDetail;

