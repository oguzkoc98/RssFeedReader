/**
 * HTML string'den ilk resim URL'ini çıkarır
 * @param {string} html - HTML içerik
 * @returns {string|null} - Resim URL'i veya null
 */
export function extractImageFromHtml(html) {
  if (!html || typeof html !== 'string') {
    return null;
  }

  // Farklı img tag formatlarını dene
  const patterns = [
    // Standart: <img src="url">
    /<img[^>]+src=["']([^"']+)["'][^>]*>/i,
    // Tırnaksız: <img src=url>
    /<img[^>]+src=([^\s>]+)/i,
    // data-src (lazy loading): <img data-src="url">
    /<img[^>]+data-src=["']([^"']+)["'][^>]*>/i,
    // data-lazy-src: <img data-lazy-src="url">
    /<img[^>]+data-lazy-src=["']([^"']+)["'][^>]*>/i,
    // Background image: style="background-image: url(...)"
    /background-image:\s*url\(["']?([^"')]+)["']?\)/i,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match && match[1]) {
      let url = match[1].trim();
      // Tırnak işaretlerini temizle
      url = url.replace(/^["']|["']$/g, '');
      // Geçerli URL kontrolü
      if (url && (url.startsWith('http') || url.startsWith('//') || url.startsWith('/'))) {
        return url;
      }
    }
  }

  return null;
}

