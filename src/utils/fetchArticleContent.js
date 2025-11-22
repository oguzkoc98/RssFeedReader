import axios from 'axios';
import {XMLParser} from 'fast-xml-parser';

/**
 * Haber link'inden tam içeriği çekmeye çalışır
 * @param {string} articleUrl - Haber link'i
 * @returns {Promise<string|null>} - HTML içerik veya null
 */
export async function fetchArticleContent(articleUrl) {
  if (!articleUrl) return null;

  try {
    const response = await axios.get(articleUrl, {
      timeout: 10000,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });

    const html = response.data;

    // Her haber sitesi için özel içerik çıkarma
    if (articleUrl.includes('sozcu.com.tr')) {
      return extractSozcuContent(html);
    } else if (articleUrl.includes('cnnturk.com')) {
      return extractCNNTurkContent(html);
    } else if (articleUrl.includes('t24.com.tr')) {
      return extractT24Content(html);
    } else if (articleUrl.includes('haberturk.com')) {
      return extractHaberturkContent(html);
    }

    // Genel fallback: article, main, content class'larını dene
    return extractGenericContent(html);
  } catch (error) {
    console.error('Article content fetch hatası:', articleUrl, error.message);
    return null;
  }
}

// Sözcü için içerik çıkarma
function extractSozcuContent(html) {
  // Sözcü'de genellikle article-content veya benzer class'lar var
  const patterns = [
    /<div[^>]*class="[^"]*article-content[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /<div[^>]*class="[^"]*content[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /<article[^>]*>([\s\S]*?)<\/article>/i,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match && match[1]) {
      return cleanHtmlContent(match[1]);
    }
  }

  return null;
}

// CNN Türk için içerik çıkarma
function extractCNNTurkContent(html) {
  const patterns = [
    /<div[^>]*class="[^"]*article-body[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /<div[^>]*class="[^"]*content[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /<article[^>]*>([\s\S]*?)<\/article>/i,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match && match[1]) {
      return cleanHtmlContent(match[1]);
    }
  }

  return null;
}

// T24 için içerik çıkarma
function extractT24Content(html) {
  const patterns = [
    /<div[^>]*class="[^"]*article-content[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /<div[^>]*class="[^"]*content[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /<article[^>]*>([\s\S]*?)<\/article>/i,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match && match[1]) {
      return cleanHtmlContent(match[1]);
    }
  }

  return null;
}

// Habertürk için içerik çıkarma
function extractHaberturkContent(html) {
  const patterns = [
    /<div[^>]*class="[^"]*article-content[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /<div[^>]*class="[^"]*content[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /<article[^>]*>([\s\S]*?)<\/article>/i,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match && match[1]) {
      return cleanHtmlContent(match[1]);
    }
  }

  return null;
}

// Genel içerik çıkarma
function extractGenericContent(html) {
  const patterns = [
    /<article[^>]*>([\s\S]*?)<\/article>/i,
    /<main[^>]*>([\s\S]*?)<\/main>/i,
    /<div[^>]*class="[^"]*content[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match && match[1]) {
      return cleanHtmlContent(match[1]);
    }
  }

  return null;
}

// HTML içeriği temizle
function cleanHtmlContent(html) {
  if (!html) return null;

  // Script ve style tag'lerini kaldır
  html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  
  // Gereksiz div'leri temizle (reklam, sidebar vb.)
  html = html.replace(/<div[^>]*(?:class|id)="[^"]*(?:ad|advertisement|sidebar|social|share|comment)[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');
  
  // Boş paragrafları temizle
  html = html.replace(/<p[^>]*>\s*<\/p>/gi, '');
  
  return html.trim();
}

