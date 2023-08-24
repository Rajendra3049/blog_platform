import {
  USER_ERROR,
  USER_LOADING,
  USER_LOGIN,
  USER_LOGOUT,
  USER_SIGNUP,
} from "./user.action-type";

export const userLogin =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_LOADING });

      const res = await fetch(
        `https://blog-server-vzh9.onrender.com/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", JSON.stringify(data.token));
      }
      dispatch({ type: USER_LOGIN });
    } catch (error) {
      dispatch({ type: USER_ERROR });
    }
  };

export const userSignup =
  ({ name, email, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_LOADING });

      const res = await fetch(
        `https://blog-server-vzh9.onrender.com/user/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );
      const data = await res.json();
      if (data.msg === "signup successful") {
        dispatch({ type: USER_SIGNUP });
      } else {
        dispatch({ type: USER_ERROR });
      }
    } catch (error) {
      dispatch({ type: USER_ERROR });
    }
  };

export const userLogout = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT });
};
