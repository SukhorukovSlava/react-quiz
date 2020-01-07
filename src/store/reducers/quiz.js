import {ActionType} from "../actions/ActionType";

const initialState = {
    quizes: [],
    loading: false,
    activeQuestion: 0,
    answerState: null,
    isFinished: false,
    results: {},
    quiz: null
};

export const quizReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.typeList.FETCH_START:
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
        case ActionType.typeList.FETCH_QUIZ_SUCCESS:
            return {
                ...state,
                loading: false,
                quiz: action.payload
            };
        case ActionType.typeList.QUIZ_FINISHED:
            return {
                ...state,
                isFinished: true
            };
        case ActionType.typeList.QUIZ_NEXT_QUESTION:
            return {
                ...state,
                activeQuestion: action.payload,
                answerState: null
            };
        case ActionType.typeList.INVALID_ANSWER_PASSED:
            return {
                ...state,
                answerState: action.payload.answerState,
                results: action.payload.result
            };
        case ActionType.typeList.VALID_ANSWER_PASSED:
            return {
                ...state,
                answerState: action.payload.answerState,
                results: action.payload.result
            };
        case ActionType.typeList.RETRY_QUIZ:
            return {
                ...state,
                activeQuestion: 0,
                answerState: null,
                isFinished: false,
                results: {}
            };
        case ActionType.typeList.FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};