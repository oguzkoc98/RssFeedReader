import React from 'react';
import {Text, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

//components
import SubsButton from '../SubsButton/SubsButton';

//style
import styles from './NewsContent.style';

const NewsContent = ({title, category, color, url}) => {
  // Kategori bilgisini de içeren standart isim oluştur
  const displayName =
    category && category !== 'Tüm Haberler' ? `${title} - ${category}` : title;

  // Kategoriye göre ikon seçimi
  const getCategoryIcon = categoryName => {
    switch (categoryName) {
      case 'Tüm Haberler':
        return 'newspaper-outline';
      case 'Siyaset':
        return 'business-outline';
      case 'Ekonomi':
        return 'cash-outline';
      case 'Spor':
        return 'football-outline';
      case 'Magazin':
        return 'star-outline';
      case 'Son Dakika':
        return 'flash-outline';
      default:
        return 'list-outline';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <View style={[styles.iconWrapper, {backgroundColor: `${color}15`}]}>
          <Ionicons
            name={getCategoryIcon(category)}
            size={18}
            color={color}
            style={styles.icon}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.category}>{category}</Text>
          {title && (
            <Text style={[styles.sourceName, {color: color}]}>{title}</Text>
          )}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <SubsButton url={url} name={displayName} />
      </View>
    </View>
  );
};

export default NewsContent;
