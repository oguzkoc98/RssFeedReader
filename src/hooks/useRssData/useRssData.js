import {useState, useEffect} from 'react';
import axios from 'axios';

//rss-parser
import * as rssParser from 'react-native-rss-parser';

function useRssData(rssUrl) {
  const [rssData, setRssData] = useState(null);

  useEffect(() => {
    const fetchRssData = async () => {
      try {
        const response = await axios.get(rssUrl);
        const rss = await rssParser.parse(response.data);
        setRssData(rss);
      } catch (error) {
        console.log('Rss verileri alınırken hata oluştu', error);
      }
    };

    fetchRssData();
  }, [rssUrl]);

  return rssData;
}

export default useRssData;
