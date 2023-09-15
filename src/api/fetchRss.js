import axios from 'axios';

//rss-parser
import * as rssParser from 'react-native-rss-parser';

async function fetchRss(rssUrl) {
  return new Promise((resolve, reject) => {
    axios.get(rssUrl).then(response => {
      rssParser.parse(response.data).then(data => {
        resolve(data);
      });
    });
  });
}

export default fetchRss;
