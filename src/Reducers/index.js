import {FETCH_DATA,FETCH_DATA_LOADING,FETCH_DATA_LOADING_SUCCESS,FETCH_DATA_LOADING_FAILURE,initialState} from '../Constants';
import { combineReducers } from 'redux';

export const itemReducer = (state = initialState,action) => {
    switch(action.type) {
        case FETCH_DATA_LOADING_SUCCESS:
            return {
                ...state,
                items: [...action.items]
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
    itemLoading,
    itemLoadingError
});

export default rootReducer;

