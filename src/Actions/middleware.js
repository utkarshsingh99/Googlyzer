import data from '../Constants/db.json';
import { fetchChart1, fetchChart2, fetchChart3, fetchChart4 } from './index';

import * as moment from 'moment';

const convertToSeconds = (duration) => {
    const newDuration = moment.duration(duration, moment.ISO_8601);
    return Math.min(1800, newDuration.asSeconds());
}

export const buildChart1 = () => {
    // To Plot:
    // Y-AXIS: duration of watching videos
    // X-AXIS: day/date/month/year.
    // TODO: Will probably need to group all dates in one object and sum up durations. 
    // But that would lose the count of the videos watched 
    return dispatch => {
        const timeData = data.durations.map(item => {
            const time = new Date(item.time);
            return {
                duration: convertToSeconds(item.duration),
                date: time.toDateString(),
                month: time.getMonth(),
                year: time.getFullYear()
            }
        });  

        return dispatch(fetchChart1(timeData))
    }
}

export const buildChart2 = () => {
    // To Plot:
    // Y-AXIS: Number of videos
    // X-AXIS: Category
    return dispatch => {
        const categoryObj = getDurationAndCountBy('category');
        dispatch(fetchChart2(categoryObj))    
    };
}

export const buildChart3 = () => {
    // To Plot:
    // Y-AXIS: Duration of videos
    // X-AXIS: Category
    return dispatch => {
        const categoryObj = {}
        for(let item of data.durations) {
            const duration = convertToSeconds(item.duration);
            item.category.forEach(category => categoryObj[category] = categoryObj[category] ? categoryObj[category]+duration : duration)
        }
        dispatch(fetchChart3(categoryObj))    
    };
}

export const buildChart4 = () => {
    // To Plot:
    // Y-AXIS: Number of videos
    // X-AXIS: Channel
    return dispatch => {
        const channels = getDurationAndCountBy('snippet.channelTitle');
        dispatch(fetchChart4(channels));
    }
}

function getDurationAndCountBy (factor) {
    let object = {}, debug = [];
        for(let item of data.durations) {
            // Extracting the key value from item object
            // If factor is category: key = item.category
            // If factor is snippet.channelTitle: key = item.snippet.channelTitle
            const key = factor.search(/\./) !== -1 ? item[factor.split(/\./)[0]][factor.split(/\./)[1]] : item[factor];

            // For each item, there is one channelTitle, hence the key will be a string
            if (typeof key === 'string') {
                object = AddOrUpdate(object, key, item.duration);
            } else { // When category factor returns an array of categories for each item
                for (let eachKey of key) {
                    object = AddOrUpdate(object, eachKey, item.duration);
                }
            } 
        }
        return object;
}

function AddOrUpdate(object, key, itemDuration) {
    // Setting duration in minutes
    const duration = convertToSeconds(itemDuration)/60;
    if (object[key] === undefined){
        object[key] = {
            duration,
            count: 1
        }
    } else {
        object[key]['duration'] = object[key]['duration'] ? object[key]['duration'] + duration : duration;
        object[key]['count'] = object[key]['count'] ? object[key]['count'] + 1 : 1;
    }
    return object;
}