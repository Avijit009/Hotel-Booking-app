import { combineReducers } from 'redux';
import * as actionTypes from './actionTypes';
import { reducer as formReducer } from 'redux-form'; // Importing reducer from redux-form
import { InitialContactForm } from './form';

export const authReducer = (authState = { token: null, userId: null }, action) => {
    switch (action.type) {
        case actionTypes.AUTH_SUCCESS:
            return {
                ...authState,
                token: action.payload.token,
                userId: action.payload.userId,
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...authState,
                token: null,
                userId: null,
            }
        default:
            return authState;
    }
}

const hotelReducer = (hotelState = { isLoading: false, hotels: [], errMess: null }, action) => {
    switch (action.type) {
        case actionTypes.HOTELS_LOADING:
            return {
                ...hotelState,
                isLoading: true,
                errMess: null,
                hotels: []
            }
        case actionTypes.LOAD_HOTELS:
            return {
                ...hotelState,
                isLoading: false,
                errMess: null,
                hotels: action.payload,
            }
        case actionTypes.HOTELS_FAILED:
            return {
                ...hotelState,
                isLoading: false,
                errMess: action.payload,
                hotels: []
            }
        default:
            return hotelState;
    }
}

const commentReducer = (commentState = { isLoading: true, comments: [] }, action) => {
    switch (action.type) {
        case actionTypes.LOAD_COMMENTS:
            return {
                ...commentState,
                isLoading: false,
                comments: action.payload
            }

        case actionTypes.COMMENT_LOADING:
            return {
                ...commentState,
                isLoading: true,
                comments: []
            }

        case actionTypes.ADD_COMMENT:
            let comment = action.payload;
            return {
                ...commentState,
                comments: commentState.comments.concat(comment)
            }
        default:
            return commentState;
    }
}

const feedbackReducer = (feedbackState = { isLoading: true, feedback: [] }, action) => {
    switch (action.type) {
        case actionTypes.LOAD_FEEDBACK:
            return {
                ...feedbackState,
                isLoading: false,
                feedback: action.payload,
            }

        case actionTypes.FEEDBACK_LOADING:
            return {
                ...feedbackState,
                isLoading: true,
                feedback: []
            }

        default:
            return feedbackState;
    }
}

// Define initial state for the form
const initialFormState = InitialContactForm;

export const Reducer = combineReducers({
    hotels: hotelReducer,
    comments: commentReducer,
    form: formReducer.plugin({
        feedback: (state = initialFormState, action) => { // Using plugin to manage form state with initial state
            switch (action.type) {
                // Handle specific form-related actions if needed
                default:
                    return state;
            }
        }
    }),
    feedback: feedbackReducer,
    auth: authReducer
});
