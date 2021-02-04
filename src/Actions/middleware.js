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
        const categoryObj = {};
        for(let item of data.durations) {
            item.category.forEach(category => categoryObj[category] = categoryObj[category] ? categoryObj[category]+1 : 1)
        }
        dispatch(fetchChart2(categoryObj))    
    };
}

export const buildChart3 = () => {
    // To Plot:
    // Y-AXIS: Duration of videos
    // X-AXIS: Category
    return dispatch => {
        const categoryObj = {};
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
        const channels = {}
        for(let item of data.durations) {
            // Setting duration in minutes
            const duration = convertToSeconds(item.duration)/60;
            if (channels[item.snippet.channelTitle] === undefined){
                channels[item.snippet.channelTitle] = {
                    duration,
                    count: 1
                }
            } else {
                channels[item.snippet.channelTitle]['duration'] = channels[item.snippet.channelTitle]['duration'] ? channels[item.snippet.channelTitle]['duration'] + duration : duration;
                channels[item.snippet.channelTitle]['count'] = channels[item.snippet.channelTitle]['count'] ? channels[item.snippet.channelTitle]['count'] + 1 : 1;
            }
        }
        dispatch(fetchChart4(channels));
    }
}