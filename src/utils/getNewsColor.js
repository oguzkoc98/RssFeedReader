import newsData from '../data/news.json';

// Haber sitesi adına göre rengi döndür
export function getNewsColor(sourceName) {
  if (!sourceName) return '#0077A8';
  
  const news = newsData.news.find(
    item => item.name.toLowerCase() === sourceName.toLowerCase()
  );
  
  return news ? news.color : '#0077A8';
}

// Haber sitesi adına göre kategori bilgisini döndür
export function getCategoryFromSubscription(subscriptionName) {
  if (!subscriptionName) return '';
  
  const parts = subscriptionName.split(' - ');
  return parts.length > 1 ? parts[1].trim() : '';
}

