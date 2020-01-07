import axios from "../../axios/axios-quiz";
import {ActionType} from "./ActionType";

export const fetchQuizes = () => async dispatch => {

    dispatch(fetchStart());

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
        dispatch(fetchError(e))
    }
};

export const fetchStart = () => {
    return {
        type: ActionType.typeList.FETCH_START
    };
};

export const fetchQuizesSuccess = quizes => {
    return {
        type: ActionType.typeList.FETCH_QUIZES_SUCCESS,
        payload: quizes
    };
};

export const fetchError = error => {
    return {
        type: ActionType.typeList.FETCH_ERROR,
        error: error
    };
};

export const fetchQuizById = quizId => async dispatch => {

    dispatch(fetchStart());

    try {
        const response = await axios.get(`quiz/${quizId}.json`);
        const quiz = response.data;

        dispatch(fetchQuizSuccess(quiz));

    } catch (e) {
        dispatch(fetchError(e));
    }
};

export const fetchQuizSuccess = quiz => {
    return {
        type: ActionType.typeList.FETCH_QUIZ_SUCCESS,
        payload: quiz
    };
};

export const answerClickHandler = answerId => {

    return (dispatch, getState) => {
        const state = getState().quiz;

        if (state.answerState) {
            const key = Object.keys(state.answerState)[0];
            if (state.answerState[key] === 'success') {
                return;
            }
        }

        const {activeQuestion, results} = state;
        const question = state.quiz[activeQuestion];

        if (parseInt(question.rightAnswerId) === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success';
            }

            dispatch(validAnswerPassed({[answerId]: 'success'}, results));

            setTimeout(() => {
                const nextQuestionNumber = state.activeQuestion + 1;
                if (isFinishedQuiz(nextQuestionNumber, state)) {
                    dispatch(quizFinished());
                } else {
                    dispatch(quizNextQuestion(nextQuestionNumber));
                }
            }, 1000);
        } else {
            results[question.id] = 'error';
            dispatch(invalidAnswerPassed({[answerId]: 'error'}, results));
        }
    };
};

const validAnswerPassed = (answerState, result) => {
    return {
        type: ActionType.typeList.VALID_ANSWER_PASSED,
        payload: {
            answerState: answerState,
            result: result
        }
    };
};

const isFinishedQuiz = (numberNextQuestion, state) => {
    return numberNextQuestion === state.quiz.length;
};

const quizFinished = () => {
    return {
        type: ActionType.typeList.QUIZ_FINISHED,
    };
};

const quizNextQuestion = nextQuestionNumber => {
    return {
        type: ActionType.typeList.QUIZ_NEXT_QUESTION,
        payload: nextQuestionNumber
    };
};

const invalidAnswerPassed = (answerState, result) => {
    return {
        type: ActionType.typeList.INVALID_ANSWER_PASSED,
        payload: {
            answerState: answerState,
            result: result
        }
    };
};

export const retryQuiz = () => {
    return {
        type: ActionType.typeList.RETRY_QUIZ
    };
};