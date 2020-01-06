export class ActionType {
    static typeList = {
        FETCH_QUIZES_START: 'FETCH_QUIZES_START',
        FETCH_QUIZES_SUCCESS: 'FETCH_QUIZES_SUCCESS',
        FETCH_QUIZES_ERROR: 'FETCH_QUIZES_ERROR',
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