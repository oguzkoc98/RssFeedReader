import axios from 'axios';
import {XMLParser} from 'fast-xml-parser';
import {extractImageFromHtml} from '../utils/extractImageFromHtml';

// Başlık temizleme fonksiyonu
function cleanTitle(title) {
  if (!title) return '';

  // Önce HTML entity'leri decode et
  let cleaned = decodeHtmlEntities(title);

  // Gereksiz kelimeleri ve karakterleri temizle
  cleaned = cleaned
    .replace(/\.com/g, '')
    .replace(/Gazetesi/g, '')
    .replace(/Haberler/g, '')
    .replace(/son dakika/gi, '')
    .replace(/kose yazilari/gi, '')
    .replace(/[,|]/g, '')
    .trim();

  // Birden fazla boşluğu tek boşluğa çevir (decodeHtmlEntities zaten yapıyor ama yine de)
  cleaned = cleaned.replace(/\s+/g, ' ');

  return cleaned;
}

// HTML entity'leri decode et
function decodeHtmlEntities(text) {
  if (!text || typeof text !== 'string') return text;

  let decoded = text;

  // Önce named entity'leri decode et
  const namedEntities = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&nbsp;': ' ',
    '&copy;': '©',
    '&reg;': '®',
    '&trade;': '™',
  };

  for (const [entity, char] of Object.entries(namedEntities)) {
    decoded = decoded.replace(new RegExp(entity, 'gi'), char);
  }

  // Hexadecimal entity'leri decode et (&#xA0;, &#x20; vb.)
  decoded = decoded.replace(/&#x([0-9A-Fa-f]+);/g, (match, hex) => {
    try {
      const charCode = parseInt(hex, 16);
      // Non-breaking space ve diğer boşluk karakterlerini normal boşluğa çevir
      if (charCode === 160 || charCode === 8201 || charCode === 8202) {
        return ' ';
      }
      return String.fromCharCode(charCode);
    } catch (e) {
      return match;
    }
  });

  // Decimal entity'leri decode et (&#160;, &#32; vb.)
  decoded = decoded.replace(/&#(\d+);/g, (match, dec) => {
    try {
      const charCode = parseInt(dec, 10);
      // Non-breaking space ve diğer boşluk karakterlerini normal boşluğa çevir
      if (charCode === 160 || charCode === 8201 || charCode === 8202) {
        return ' ';
      }
      return String.fromCharCode(charCode);
    } catch (e) {
      return match;
    }
  });

  // Çift ve fazla boşlukları tek boşluğa çevir
  decoded = decoded.replace(/\s+/g, ' ');

  return decoded.trim();
}

// Text değerini çıkar (obje veya string olabilir)
function extractText(value) {
  if (!value) return '';
  if (typeof value === 'string') {
    // HTML entity'leri decode et
    return decodeHtmlEntities(value);
  }
  if (typeof value === 'object') {
    // Önce __cdata'yı dene (CDATA içeriği) - en önemli
    if (value['__cdata']) {
      return decodeHtmlEntities(value['__cdata']);
    }
    // Sonra #text'i dene
    if (value['#text']) {
      return decodeHtmlEntities(value['#text']);
    }
    // Eğer direkt string değer varsa (nested object)
    const keys = Object.keys(value);
    if (keys.length === 1) {
      const firstKey = keys[0];
      if (typeof value[firstKey] === 'string') {
        return decodeHtmlEntities(value[firstKey]);
      }
      // Eğer nested object ise recursive olarak dene
      if (typeof value[firstKey] === 'object' && value[firstKey]['__cdata']) {
        return decodeHtmlEntities(value[firstKey]['__cdata']);
      }
      if (typeof value[firstKey] === 'object' && value[firstKey]['#text']) {
        return decodeHtmlEntities(value[firstKey]['#text']);
      }
    }
    // Son olarak objeyi string'e çevir
    return JSON.stringify(value);
  }
  return String(value);
}

// Tarih alanını bul (farklı RSS formatlarını destekle)
function getDate(item, rssUrl) {
  // Önce pubDate'i dene (en yaygın)
  if (item.pubDate) {
    const date = extractText(item.pubDate);
    if (date && date.trim()) {
      return date.trim();
    }
  }

  // Sözcü için alternatif alanlar
  if (rssUrl && rssUrl.includes('sozcu.com.tr')) {
    if (item.published) {
      const date = extractText(item.published);
      if (date && date.trim()) {
        return date.trim();
      }
    }
    // Link'ten tarih çıkarmayı dene (örn: /2024/11/22/...)
    if (item.link) {
      const link = extractText(item.link);
      const dateMatch = link.match(/\/(\d{4})\/(\d{2})\/(\d{2})\//);
      if (dateMatch) {
        const [, year, month, day] = dateMatch;
        return `${year}-${month}-${day}T00:00:00Z`;
      }
    }
  }

  // Sonra dc:date'i dene
  if (item['dc:date']) {
    const date = extractText(item['dc:date']);
    if (date && date.trim()) {
      return date.trim();
    }
  }

  if (item.dc && item.dc.date) {
    const date = extractText(item.dc.date);
    if (date && date.trim()) {
      return date.trim();
    }
  }

  // Son olarak date'i dene
  if (item.date) {
    const date = extractText(item.date);
    if (date && date.trim()) {
      return date.trim();
    }
  }

  return '';
}

// Description alanını bul (farklı RSS formatlarını destekle)
function getDescription(item) {
  // Önce content:encoded'i dene (genellikle tam içerik)
  if (item['content:encoded']) {
    const desc = extractText(item['content:encoded']);
    if (desc && desc.trim()) return desc.trim();
  }

  if (item.content && item.content.encoded) {
    const desc = extractText(item.content.encoded);
    if (desc && desc.trim()) return desc.trim();
  }

  // Sonra description'ı dene (CDATA içerebilir)
  if (item.description) {
    let desc = extractText(item.description);
    if (desc && desc.trim()) {
      // CDATA içeriğini temizle
      desc = desc.replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '');
      // HTML tag'lerini koru ama gereksiz boşlukları temizle
      desc = desc.trim();
      return desc;
    }
  }

  // Son olarak summary'yi dene
  if (item.summary) {
    const desc = extractText(item.summary);
    if (desc && desc.trim()) return desc.trim();
  }

  return '';
}

async function fetchRss(rssUrl) {
  try {
    const response = await axios.get(rssUrl, {
      timeout: 10000,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      textNodeName: '#text',
      parseAttributeValue: true,
      trimValues: true,
      preserveOrder: false,
      ignoreNameSpace: false,
      ignoreDeclaration: true,
      cdataTagName: '__cdata',
      cdataPositionChar: '\\c',
      removeNSPrefix: false,
      parseTagValue: true,
      parseNodeValue: true,
    });

    const result = parser.parse(response.data);

    const channel = result.rss?.channel || result.feed || {};
    const items = Array.isArray(channel.item)
      ? channel.item
      : channel.item
      ? [channel.item]
      : channel.entry // Atom feed formatı
      ? Array.isArray(channel.entry)
        ? channel.entry
        : [channel.entry]
      : [];

    // Debug: İlk item'ı logla (geliştirme için) - media:content kontrolü
    if (items.length > 0 && __DEV__) {
      const firstItem = items[0];
      console.log('RSS Item media:content:', firstItem['media:content']);
      console.log('RSS Item description:', firstItem.description);
    }

    const cleanedTitle = cleanTitle(extractText(channel.title || ''));

    const feed = {
      title: cleanedTitle,
      description: extractText(channel.description || ''),
      link: extractText(channel.link || ''),
      items: items
        .filter(item => {
          // Döviz kurları ve benzeri haber olmayan içerikleri filtrele
          const title = extractText(item.title || '');
          if (!title || title.trim().length === 0) return false;
          
          const lowerTitle = title.toLowerCase();
          // Sadece tam eşleşen veya çok kısa başlıkları filtrele
          const excludedPatterns = [
            /^döviz kuru/i,
            /^canlı döviz/i,
            /^güncel kur/i,
            /^altın fiyatı/i,
            /^borsa endeksi/i,
            /^bist\s*\d+$/i,
          ];
          
          // Eğer başlık çok kısa ve sadece kur/altın/borsa içeriyorsa filtrele
          if (title.length < 30) {
            const isExcluded = excludedPatterns.some(pattern => pattern.test(title));
            if (isExcluded) return false;
          }
          
          return true;
        })
        .map(item => {
        const description = getDescription(item);
        const pubDate = getDate(item, rssUrl);
        let title = extractText(item.title || '');
        // Başlıktaki HTML entity'leri ve boşlukları temizle
        title = title.replace(/\s+/g, ' ').trim();
        const link = extractText(item.link || item.id || '');

        // Resim için tüm olası alanları kontrol et
        let imageUrl = null;
        
        // 1. Enclosure (RSS 2.0 standard) - array veya obje olabilir
        if (!imageUrl && item.enclosure) {
          const enclosure = Array.isArray(item.enclosure) ? item.enclosure[0] : item.enclosure;
          if (enclosure && enclosure['@_type'] && enclosure['@_type'].startsWith('image/')) {
            imageUrl = enclosure['@_url'] || enclosure['@_href'] || null;
          }
        }
        
        // 2. Media content (Media RSS) - Sözcü, CNN Türk için
        // Farklı namespace formatlarını dene
        if (!imageUrl) {
          // media:content (namespace ile)
          const mediaContent = item['media:content'] || item.media?.content;
          if (mediaContent) {
            const content = Array.isArray(mediaContent) ? mediaContent[0] : mediaContent;
            if (content) {
              // medium="image" veya type="image/jpeg" kontrolü
              const medium = content['@_medium'];
              const type = content['@_type'];
              const url = content['@_url'];
              
              if (url && (medium === 'image' || (type && type.startsWith('image/')))) {
                imageUrl = url;
              }
            }
          }
        }
        
        // 3. Media thumbnail (Media RSS)
        if (!imageUrl && item['media:thumbnail']) {
          const thumbnail = Array.isArray(item['media:thumbnail']) 
            ? item['media:thumbnail'][0] 
            : item['media:thumbnail'];
          if (thumbnail && thumbnail['@_url']) {
            imageUrl = thumbnail['@_url'];
          }
        }
        
        // 4. Media group içindeki content
        if (!imageUrl && item['media:group']) {
          const mediaGroup = Array.isArray(item['media:group']) 
            ? item['media:group'][0] 
            : item['media:group'];
          if (mediaGroup) {
            if (mediaGroup['media:content']) {
              const mediaContent = Array.isArray(mediaGroup['media:content']) 
                ? mediaGroup['media:content'][0] 
                : mediaGroup['media:content'];
              if (mediaContent && 
                  (mediaContent['@_medium'] === 'image' || 
                   (mediaContent['@_type'] && mediaContent['@_type'].startsWith('image/'))) &&
                  mediaContent['@_url']) {
                imageUrl = mediaContent['@_url'];
              }
            }
            if (!imageUrl && mediaGroup['media:thumbnail']) {
              const thumbnail = Array.isArray(mediaGroup['media:thumbnail']) 
                ? mediaGroup['media:thumbnail'][0] 
                : mediaGroup['media:thumbnail'];
              if (thumbnail && thumbnail['@_url']) {
                imageUrl = thumbnail['@_url'];
              }
            }
          }
        }
        
        // 5. Nested media object
        if (!imageUrl && item.media && item.media.content) {
          const mediaContent = Array.isArray(item.media.content) 
            ? item.media.content[0] 
            : item.media.content;
          if (mediaContent && 
              mediaContent['@_type'] && 
              mediaContent['@_type'].startsWith('image/') &&
              mediaContent['@_url']) {
            imageUrl = mediaContent['@_url'];
          }
        }
        
        // 6. Description'dan resim çıkarma (fallback) - T24 gibi siteler için
        if (!imageUrl && description) {
          // extractImageFromHtml fonksiyonunu kullan
          const extractedImage = extractImageFromHtml(description);
          if (extractedImage) {
            imageUrl = extractedImage;
          }
        }

        return {
          title: title,
          description: description,
          link: link,
          pubDate: pubDate,
          content: description || '',
          imageUrl: imageUrl,
        };
      }),
    };

    return feed;
  } catch (error) {
    console.error('RSS fetch hatası:', rssUrl, error.message);
    throw error;
  }
}

export default fetchRss;
