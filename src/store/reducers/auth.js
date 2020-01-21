import {ActionType} from "../actions/ActionType";

const initialState = {
  token: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.typeList.SUCCESSFUL_AUTH:
      return {
        ...state,
        token: action.payload
      };
    case ActionType.typeList.AUTH_LOGOUT:
      return {
        ...state,
        token: null
      };
    default:
      return state;
  }
};