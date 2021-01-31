import {FETCH_DATA,FETCH_DATA_LOADING,FETCH_DATA_LOADING_SUCCESS,FETCH_DATA_LOADING_FAILURE,initialState, CHART1_DATA_LOADING_SUCCESS, CHART2_DATA_LOADING_SUCCESS, CHART3_DATA_LOADING_SUCCESS, CHART4_DATA_LOADING_SUCCESS} from '../Constants';
import { combineReducers } from 'redux';

export const itemReducer = (state = initialState,action) => {
    switch(action.type) {
        case FETCH_DATA_LOADING_SUCCESS:
            return {
                ...state,
                items: [...action.payload]
            }
        default:
            return state;
    }
}

export const chartReducer = (state = initialState, action) => {
    switch(action.type) {
        case CHART1_DATA_LOADING_SUCCESS:
            return {
                ...state,
                chart1: {...action.payload},
            }
        case CHART2_DATA_LOADING_SUCCESS:
            return {
                ...state,
                chart2: {...action.payload}
            }
        case CHART3_DATA_LOADING_SUCCESS:
            return {
                ...state,
                chart3: {...action.payload}
            }
        case CHART4_DATA_LOADING_SUCCESS:
            return {
                ...state,
                chart4: {...action.payload}
            }
        default:
            return state;
    }
}

export const itemLoading = (state = false,action) => {
    switch(action.type) {
        case FETCH_DATA_LOADING:
            return action.status
        default:
            return state;
    }
} 

export const itemLoadingError = (state = false,action) => {
    switch(action.type) {
        case FETCH_DATA_LOADING_FAILURE:
            return action.status
        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    itemReducer,
    chartReducer,
    itemLoading,
    itemLoadingError
});

export default rootReducer;

