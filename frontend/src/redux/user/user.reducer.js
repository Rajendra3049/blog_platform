import {
  USER_ERROR,
  USER_LOADING,
  USER_LOGIN,
  USER_LOGIN_ERROR,
  USER_LOGOUT,
  USER_SIGNUP,
} from "./user.action-type";

const initialState = {
  loading: false,
  error: false,
  isAuth: false,
  msg: null,
};

const UserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case USER_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case USER_LOGIN_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
        msg: payload,
      };
    }
    case USER_SIGNUP: {
      return {
        ...state,
        loading: false,
      };
    }
    case USER_LOGIN: {
      return {
        ...state,
        loading: false,
        isAuth: true,
        token: payload,
      };
    }

    case USER_LOGOUT: {
      return {
        ...state,
        loading: false,
        isAuth: false,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default UserReducer;
