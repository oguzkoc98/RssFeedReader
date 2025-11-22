# RssFeedReader

Modern ve kullanıcı dostu bir mobil haber okuyucu uygulaması. Türkiye'nin önde gelen haber sitelerinden RSS feed'lerini abone olarak takip edebilir, haberleri kategorilere göre filtreleyebilir ve uygulama içinde detaylı olarak okuyabilirsiniz.

## 📱 Özellikler

### Haber Yönetimi
- **Çoklu Haber Kaynağı Desteği**: Habertürk, Sözcü, CNN Türk ve T24 gibi önde gelen haber sitelerinden RSS feed'leri
- **Kategori Bazlı Abonelik**: Her haber sitesinden istediğiniz kategorilere (Siyaset, Ekonomi, Spor, Magazin vb.) abone olabilme
- **Özelleştirilebilir Haber Akışı**: Sadece abone olduğunuz kaynaklardan haberleri görüntüleme
- **Haber Detay Sayfası**: Haberlerin tam içeriğini, görsellerini ve detaylarını uygulama içinde görüntüleme

### Kullanıcı Deneyimi
- **Modern ve Minimal Tasarım**: Premium ve profesyonel görünüm
- **Tab Navigasyonu**: Haber Akışı ve Abonelik yönetimi için ayrı sekmeler
- **Abonelik Yönetimi**: "Haber Siteleri" ve "Benim Listem" sekmeleri ile kolay abonelik yönetimi
- **Gerçek Zamanlı Güncelleme**: Pull-to-refresh ile haberleri anında yenileme
- **Tarih Bazlı Sıralama**: Haberler en yeniden eskiye doğru otomatik sıralanır

### Teknik Özellikler
- **RSS Feed Parsing**: Farklı RSS formatlarını (RSS 2.0, Media RSS, Atom) destekler
- **Görsel Çıkarma**: RSS feed'lerden ve HTML içeriklerinden otomatik görsel çıkarma
- **HTML Entity Decoding**: HTML entity'lerini ve özel karakterleri doğru şekilde decode eder
- **Offline Depolama**: AsyncStorage ile abonelik verilerini yerel olarak saklar

## 📖 Kullanım

### Haber Akışı
1. Ana ekranda "Haber Akışı" sekmesine gidin
2. Abone olduğunuz kaynaklardan gelen haberleri görüntüleyin
3. Bir habere tıklayarak detay sayfasını açın
4. Aşağı çekerek haberleri yenileyin

### Abonelik Yönetimi
1. "Abonelik" sekmesine gidin
2. **Haber Siteleri** sekmesinde:
   - Haber sitelerini genişleterek kategorileri görüntüleyin
   - İstediğiniz kategoriye "Abone Ol" butonuna tıklayın
3. **Benim Listem** sekmesinde:
   - Abone olduğunuz tüm kaynakları görüntüleyin
   - "Abonelikten Çık" butonu ile aboneliği iptal edin

### Haber Detayları
- Haber başlığı, kaynak, kategori ve tarih bilgisi
- Haber görseli (varsa)
- Tam haber içeriği (HTML formatında)
- Orijinal website'ye gitme seçeneği

## 🛠️ Teknolojiler

- **React Native**: Cross-platform mobil uygulama geliştirme
- **Expo**: Geliştirme ve build altyapısı
- **React Navigation**: Sayfa navigasyonu ve routing
- **Axios**: HTTP istekleri için
- **fast-xml-parser**: RSS feed parsing
- **react-native-render-html**: HTML içerik render etme
- **AsyncStorage**: Yerel veri depolama

## 📄 Lisans

Bu proje özel bir projedir.

## 👨‍💻 Geliştirici

React Native ve Expo kullanılarak geliştirilmiştir.

---

**Not**: Bu uygulama eğitim amaçlı geliştirilmiştir. Haber içerikleri ilgili haber sitelerinin RSS feed'lerinden alınmaktadır.
