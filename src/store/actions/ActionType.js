export class ActionType {
    static typeList = {
        FETCH_START: 'FETCH_START',
        FETCH_QUIZES_SUCCESS: 'FETCH_QUIZES_SUCCESS',
        FETCH_ERROR: 'FETCH_ERROR',
        FETCH_QUIZ_SUCCESS: 'FETCH_QUIZ_SUCCESS',
        QUIZ_FINISHED: 'QUIZ_FINISHED',
        QUIZ_NEXT_QUESTION: 'QUIZ_NEXT_QUESTION',
        INVALID_ANSWER_PASSED: 'INVALID_ANSWER_PASSED',
        VALID_ANSWER_PASSED: 'VALID_ANSWER_PASSED',
        RETRY_QUIZ: 'RETRY_QUIZ',
        ADD_QUIZ_QUESTION: 'ADD_QUIZ_QUESTION',
        SUCCESSFUL_AUTH: 'SUCCESSFUL_AUTH',
        AUTH_LOGOUT: 'AUTH_LOGOUT',
    };

    static getAction(action) {
        if (!this.typeList[action]) {
            throw new ReferenceError(`The passed action value [${action}] is not in the action list.`)
        }

        return this.typeList[action];
    }

    static getActionList() {
        return this.typeList;
    }
}