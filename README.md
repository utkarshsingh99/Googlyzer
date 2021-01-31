## Googlyzer

![2021-01-31-235719_1920x1080_scrot](https://user-images.githubusercontent.com/32031518/106394010-3ff9d200-6420-11eb-83bc-6fc9e6b4d76d.png)

A Data Visualization Tool for your YouTube watch history.

Note: This repo is heavily inspired by the work of [Tomas Vik's Total YouTube Watchtime](https://gitlab.com/viktomas/total-youtube-watchtime), and also borrows a certain part of code (fetch.js)
from his repo. Kudos to the amazing idea!

---

### Current Charts that can be rendered:
- Top 10 Most Watched Channels by number of videos watched
- Top 10 Most Watched Channels by duration of videos (indicative of how much time you spend watching the channel)
- Minute by Day breakdown of your YouTube watch history (kind of like what's already available on the app, but with more number of days)
- Top 10 Most Watched Categories by number of videos watched 
- Top 10 Most Watched Categories by duration of videos (indicative of how much time you spend watching the category)

### Charts in Development:
- Top Videos watched sorted by Tag and number of videos.
- Top Videos watched sorted by Tag and duration
- More coming soon...

---

### How to use
These 3 parts can be done parallely.
#### Part 1: Get your Google Data
- For now, a `db.json` file that is an abstract of my own watch history is on this repo to experiment with.
- To see your data, you need to have a `watch-history.json` file that you can get from your [Google Takeout](https://takeout.google.com/). 
- On the Takeout page, deselect all services and then select YouTube. **Make sure that the format of 'history' is set to JSON and not HTML**. All you need is your history.

#### Part 2: Start the project
> git clone https://github.com/utkarshsingh99/Googlyzer && cd Googlyzer

> npm i

#### Part 3: Get an API_KEY
- Follow this [guide](https://developers.google.com/youtube/v3/getting-started#before-you-start) to get an API_KEY
- Copy the `watch-history.json` file and store it in the root of your repo.
- In the repo, execute:
> API_KEY npm run fetch

Depending on your YT habits, this should take about 2-10 minutes to finish executing. 
Finally,

> npm start

