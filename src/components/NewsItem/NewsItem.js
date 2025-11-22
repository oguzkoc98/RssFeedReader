import React from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

// render-html
import HTML from 'react-native-render-html';

// style
import styles from './NewsItem.style';

// utils
import {getNewsColor} from '../../utils/getNewsColor';

// Text'i normalize et (uppercase'den normal case'e çevir)
function normalizeText(text) {
  if (!text || typeof text !== 'string') return text;

  // HTML tag'lerini koru
  const hasHtmlTags = /<[^>]+>/g.test(text);

  if (hasHtmlTags) {
    // HTML içeriğini normalize et
    return text.replace(/>([^<]+)</g, (match, content) => {
      const normalized = normalizeCase(content);
      return `>${normalized}<`;
    });
  }

  return normalizeCase(text);
}

// Uppercase text'i normal case'e çevir
function normalizeCase(text) {
  if (!text || typeof text !== 'string') return text;

  // Eğer tüm harfler büyükse ve en az 5 karakter varsa, normalize et
  const isAllUppercase =
    text === text.toUpperCase() &&
    text !== text.toLowerCase() &&
    text.trim().length >= 5;

  if (isAllUppercase) {
    // İlk harfi büyük, geri kalanını küçük yap
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  return text;
}

// Description'ı kısalt ve normalize et
function truncateDescription(description, maxLength = 250) {
  if (!description) return '';

  // HTML tag'lerini geçici olarak kaldır
  const textWithoutHtml = description.replace(/<[^>]+>/g, ' ').trim();

  if (textWithoutHtml.length <= maxLength) {
    return normalizeText(description);
  }

  // Kısalt ve normalize et
  const truncated = textWithoutHtml.substring(0, maxLength).trim();
  const lastSpace = truncated.lastIndexOf(' ');
  const finalText =
    lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated;

  // HTML varsa, kısaltılmış metni HTML içine yerleştir
  if (description.includes('<')) {
    return normalizeText(`<p>${finalText}...</p>`);
  }

  return normalizeText(finalText + '...');
}

// Tarih formatlama fonksiyonu
function formatDate(dateString) {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';

    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Az önce';
    if (minutes < 60) return `${minutes} dakika önce`;
    if (hours < 24) return `${hours} saat önce`;
    if (days < 7) return `${days} gün önce`;

    // Tarih formatı: 15 Kas 2024, 14:30
    const day = date.getDate();
    const monthNames = [
      'Oca',
      'Şub',
      'Mar',
      'Nis',
      'May',
      'Haz',
      'Tem',
      'Ağu',
      'Eyl',
      'Eki',
      'Kas',
      'Ara',
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

const NewsItem = ({title, description, link, source, category, pubDate, imageUrl}) => {
  const navigation = useNavigation();
  const sourceColor = getNewsColor(source);
  const formattedDate = formatDate(pubDate);

  // Title'ı normalize et
  const normalizedTitle = normalizeText(title);

  // Description'ı kısalt ve normalize et
  const displayDescription =
    description && description.trim()
      ? truncateDescription(description, 250)
      : `<p>${normalizedTitle}</p>`;

  function handleClick() {
    navigation.navigate('NewsDetail', {
      title: title,
      description: description,
      link: link,
      source: source,
      category: category,
      pubDate: pubDate,
      imageUrl: imageUrl,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.sourceContainer}>
        <Text style={[styles.source, {color: sourceColor}]}>{source}</Text>
        {category && (
          <Text style={[styles.category, {color: sourceColor}]}>
            {' • '}
            {category}
          </Text>
        )}
      </View>
      <Text style={styles.title}>{normalizedTitle}</Text>
      {displayDescription && (
        <View style={styles.descriptionContainer}>
          <HTML source={{html: displayDescription}} contentWidth={300} />
        </View>
      )}
      <View style={styles.footer}>
        {formattedDate && <Text style={styles.dateText}>{formattedDate}</Text>}
        <TouchableOpacity style={styles.button} onPress={handleClick}>
          <Text style={styles.buttonText}>Devamını Oku</Text>
          <Ionicons
            name="chevron-forward"
            size={14}
            color="#808080"
            style={styles.chevronIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewsItem;
