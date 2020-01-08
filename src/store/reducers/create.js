import {ActionType} from "../actions/ActionType";

const initialState = {
    quiz: []
};

export const createReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.typeList.ADD_QUIZ_QUESTION:
            return {
                ...state,
                quiz: [...state.quiz, action.payload]
            };
        case ActionType.typeList.RESET_STATE_QUIZ:
            return {
                ...state,
                quiz: []
            };
        default:
            return state;
    }
};