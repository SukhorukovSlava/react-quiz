import {ActionType} from "../actions/ActionType";

const initiatState = {
    quizes:[],
    loading: false
};

export const quizReducer = (state = initiatState, action) => {
    switch (action.type) {
        case ActionType.typeList.FETCH_QUIZES_START:
            return {
                ...state,
                loading: true
            };
        case ActionType.typeList.FETCH_QUIZES_SUCCESS:
            return {
                ...state,
                loading: false,
                quizes: action.payload
            };
        case ActionType.typeList.FETCH_QUIZES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};