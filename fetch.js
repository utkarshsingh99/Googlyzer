const low = require('lowdb');
const _ = require('lodash');
const FileSync = require('lowdb/adapters/FileSync');
const axios = require('axios').default;
const { isRemoved } = require('./helpers');

const adapter = new FileSync('db.json');
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ durations: [], notFound: [] }).write();
db.read();

const titleUrlExists = (example) => {
	if(!example.titleUrl) {
		return false;
	}
	return true;
}
const parseId = (example) => {
  if (!example.titleUrl) {
    console.error('bad example', example);
  }
  return {
    ...example, 
    id: example.titleUrl.split('\u003d').pop()
  };
};
async function fetchBatch(videos) {
  // https://developers.google.com/youtube/v3/docs/videos/list
  const ids = videos.map(video => video.id);
  const idsGetParam = encodeURIComponent(ids.join(','));
  const apiKey = process.env.API_KEY;

  // console.log(ids);
  const response = await axios.get(
    // TODO: explore api apart from contentDetail to get an idea of categories, etc
    `https://content.googleapis.com/youtube/v3/videos?id=${idsGetParam}&part=snippet,contentDetails,topicDetails&key=${apiKey}`,
  );
  const respItems = response.data.items;

  // Need to merge videos array and items array giving {id, title, titleUrl, duration...}
  const items = respItems.map(item => {
    let videoItem = videos.find(video => video.id === item.id);

    if(item.topicDetails) {
      item.topicDetails.topicCategories = item.topicDetails.topicCategories.map(category => {
        // return 'Entertainment' for 'https://en.wikipedia.org/wiki/Entertainment'
        return category.split('wiki/').pop();
      })
    } else {
      item.topicDetails = {
        topicCategories: []
      };
    }

    item.snippet = (({publishedAt, title, thumbnails, channelTitle, tags}) => ({publishedAt, title, thumbnails: thumbnails.standard, channelTitle, tags: tags ? tags : []}))(item.snippet);
    return {
      ...videoItem,
      ...item
    }
  })
  const notFound = _.difference(
    videos,
    items.map((i) => i.id),
  );
  notFound.forEach((id) => db.get('notFound').push({ id }).write());
  items.forEach((item) => {
    console.log('Printing item', item);
    db
    .get('durations')
    .push({ id: item.id, 
      duration: item.contentDetails.duration,
      time: item.time,
      // title: item.title, // Actual title already present in snippet object
      titleUrl: item.titleUrl,
      snippet: item.snippet,
      category: item.topicDetails.topicCategories
    })
    .write()
  });
}

const history = require('../watch-history.json');

const live = history.filter((e) => !isRemoved(e));

const allIds = live.filter(e => titleUrlExists(e)).map((e) => parseId(e));
const unique = _.uniq(allIds);

const onlyMissing = unique.filter(
  ({id}) =>
    !db.get('durations').find({ id }).value() &&
    !db.get('notFound').find({ id }).value(),
);

console.log(history.length, live.length, unique.length, onlyMissing.length);

if (!onlyMissing.length) {
  console.log('all is fetched');
  process.exit(0);
}

async function fetchAll(videos) {
  const chunks = _.chunk(videos, 50);
  for (const ch of chunks) {
    await fetchBatch(ch);
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

fetchAll(onlyMissing)
  .then(() => console.log('done'))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
