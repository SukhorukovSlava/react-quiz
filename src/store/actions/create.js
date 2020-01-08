import {ActionType} from "./ActionType";
import axios from 'axios';
import appConfig from "../../appConfig";

export const addQuestion = item => {
    return {
        type: ActionType.typeList.ADD_QUIZ_QUESTION,
        payload: item
    }
};

export const createQuiz = () => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            await axios.post(appConfig.firebaseURL + '/quiz.json', state.create.quiz);
            dispatch(resetStateQuiz());
        } catch (e) {
            console.error(e);
        }
    }
};

const resetStateQuiz = () => {
    return {
        type: ActionType.typeList.RESET_STATE_QUIZ
    }
};