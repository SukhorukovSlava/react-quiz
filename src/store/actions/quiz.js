import axios from "../../axios/axios-quiz";
import {ActionType} from "./ActionType";

export const fetchQuizes = () => async dispatch => {

    dispatch(fetchQuizesStart());

    try {
        const response = await axios.get('/quiz.json');

        const quizes = [];
        Object.keys(response.data).forEach((key, index) => {
            quizes.push({
                id: key,
                name: `Тест №${index + 1}`
            })
        });

        dispatch(fetchQuizesSuccess(quizes))

    } catch (e) {
        dispatch(fetchQuizesError(e))
    }
};

export const fetchQuizesStart = () => {
    return {
        type: ActionType.typeList.FETCH_QUIZES_START
    };
};

export const fetchQuizesSuccess = quizes => {
    return {
        type: ActionType.typeList.FETCH_QUIZES_SUCCESS,
        payload: quizes
    };
};

export const fetchQuizesError = error => {
    return {
        type: ActionType.typeList.FETCH_QUIZES_ERROR,
        error: error
    };
};