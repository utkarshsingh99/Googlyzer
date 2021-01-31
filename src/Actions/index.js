import {FETCH_DATA_LOADING_SUCCESS, FETCH_DATA_LOADING_FAILURE, FETCH_DATA_LOADING, CHART1_DATA_LOADING_SUCCESS, CHART2_DATA_LOADING_SUCCESS, CHART3_DATA_LOADING_SUCCESS, CHART4_DATA_LOADING_SUCCESS} from '../Constants';

export const fetchDataLoading = (status) => {
    return {
        type: FETCH_DATA_LOADING,
        status
    }
}

export const fetchDataSuccess = (data) => {
    return {
        type: FETCH_DATA_LOADING_SUCCESS,
        payload: data
    }
}

export const fetchDataFailure = (status) => {
    return {
        type: FETCH_DATA_LOADING_FAILURE,
        status
    }
}

export const fetchChart1 = (data) => {
    return {
        type: CHART1_DATA_LOADING_SUCCESS,
        payload: {
            data,
            loaded: true
        }
    }
}

export const fetchChart2 = (data) => {
    return {
        type: CHART2_DATA_LOADING_SUCCESS,
        payload: {
            data,
            loaded: true
        }
    }
}

export const fetchChart3 = (data) => {
    return {
        type: CHART3_DATA_LOADING_SUCCESS,
        payload: {
            data,
            loaded: true
        }
    }
}

export const fetchChart4 = (data) => {
    return {
        type: CHART4_DATA_LOADING_SUCCESS,
        payload: {
            data,
            loaded: true
        }
    }
}

// export const fetchData = (url) => {
//     return (dispatch) => {
//         dispatch(fetchDataLoading(true));

//         dispatch(fetchDataSuccess(data.durations));
//         // dispatch(buildChart1(data.durations));
//         // dispatch(getCategories(data.durations));
//         // dispatch(buildChart3(data.durations));

//         dispatch(fetchDataLoading(false));
//         // fetch(url)
//         //     .then(response => {
//         //         dispatch(fetchDataLoading(false));
//         //         return response;
//         //     })
//         //     .then(response => response.json())
//         //     .then(items => dispatch(fetchDataSuccess(items)))
//         //     .catch(error => dispatch(fetchDataFailure(error)))
//     }
// }