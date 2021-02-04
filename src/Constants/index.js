export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_DATA_LOADING = 'FETCH_DATA_LOADING';
export const FETCH_DATA_LOADING_SUCCESS = 'FETCH_DATA_LOADING_SUCCESS';
export const FETCH_DATA_LOADING_FAILURE = 'FETCH_DATA_LOADING_FAILURE';
export const CHART1_DATA_LOADING_SUCCESS = 'CHART1_DATA_LOADING_SUCCESS';
export const CHART2_DATA_LOADING_SUCCESS = 'CHART2_DATA_LOADING_SUCCESS';
export const CHART3_DATA_LOADING_SUCCESS = 'CHART3_DATA_LOADING_SUCCESS';
export const CHART4_DATA_LOADING_SUCCESS = 'CHART4_DATA_LOADING_SUCCESS';

export const rootURL = 'https://jsonplaceholder.typicode.com/todos/1';

export const initialState = {
    items: [],
    chart1: {
        data: [],
        loaded: false
    },
    chart2: {
        data: {},
        loaded: false
    },
    chart3: {
        data: {},
        loaded: false
    },
    chart4: {
        data: {},
        loaded: false
    }
}

Date.prototype.getFullMonth = function () {
    const months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
    return months[this.getMonth()];
}