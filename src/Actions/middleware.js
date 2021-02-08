import data from '../Constants/db.json';
import { fetchChart1, fetchChart2, fetchChart4 } from './index';

import * as moment from 'moment';

/**
 * Converts time in ISO format 8601 to time in seconds
 * @param {number} duration 
 */
const convertToSeconds = (duration) => {
    const newDuration = moment.duration(duration, moment.ISO_8601);
    return Math.min(1800, newDuration.asSeconds());
}

let timeData = [], /* List of objects containing {duration, date, month, year} of each video item */
    categoryObj = {}, /* Key - categoryName, Value - {duration: summed up duration of all videos, count: total count of all videos containing this category} */
    channels = {} /* Key - channelName, Value - {duration: summed up duration of all videos, count: total count of all videos containing this category} */

/* Building the arrays and objects for different charts */
for(let item of data.durations) {

    categoryObj = getDurationAndCountBy('category', categoryObj, item);

    channels = getDurationAndCountBy('snippet.channelTitle', channels, item);

    const time = new Date(item.time);
    timeData.push({
        duration: convertToSeconds(item.duration),
        date: time.toDateString(),
        month: time.getMonth(),
        year: time.getFullYear()
    });
}

export const buildChart1 = () => {
    /**
     * To Plot:
     * Y-AXIS: duration of watching videos
     * X-AXIS: day/date/month/year
     */ 
    return dispatch => {
        return dispatch(fetchChart1(timeData))
    }
}

export const buildChart2 = () => {
    /**
     * To Plot:
     * Y-AXIS: Duration/Count of videos,
     * X-AXIS: Category
     */
    return dispatch => {
        dispatch(fetchChart2(categoryObj))    
    };
}

export const buildChart4 = () => {
    /**
     * To Plot:
     * Y-AXIS: Duration/Count of videos
     * X-AXIS: ChannelNumber
    */
    return dispatch => {
        dispatch(fetchChart4(channels));
    }
}

/**
* Update the object using item and factor.
* Add/Update the key in object; key is item[factor]
* @param {string} factor
* @param {object} object
* @param {object} item
*/
function getDurationAndCountBy (factor, object, item) {
    /** 
     *  If there are more such 'factors' that are needed to be visualized, this function can be reused,
     *  along with more if-else blocks (if needed)
    */

    /** 
     * Extracting the key value from item object
     * If factor is category: key = item.category
     * If factor is snippet.channelTitle: key = item.snippet.channelTitle
    */
    const key = factor.search(/\./) !== -1 ? item[factor.split(/\./)[0]][factor.split(/\./)[1]] : item[factor];

    /* For each item, there is one channelTitle, hence the key will be a string */
    if (typeof key === 'string') {
        object = AddOrUpdate(object, key, item.duration);
    } else { 
        /* When category factor returns an array of categories for each item */
        for (let eachKey of key) {
            object = AddOrUpdate(object, eachKey, item.duration);
        }
    }

    /* Return updated object */
    return object;
}

/**
 * 
 * @param {object} object 
 * @param {string} key 
 * @param {number} itemDuration 
 */
function AddOrUpdate(object, key, itemDuration) {
    /* Setting duration in minutes */
    const duration = convertToSeconds(itemDuration)/60;

    /* If the key does not exist in object */
    if (object[key] === undefined){
        object[key] = {
            duration,
            count: 1
        }
    } else {
        /* If key exists, update the values */
        object[key]['duration'] = object[key]['duration'] ? object[key]['duration'] + duration : duration;
        object[key]['count'] = object[key]['count'] ? object[key]['count'] + 1 : 1;
    }

    /* Return updated object */
    return object;
}