import {
  USER_ERROR,
  USER_LOADING,
  USER_LOGIN,
  USER_LOGIN_ERROR,
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
      console.log(data);
      if (data.msg === "login successful") {
        localStorage.setItem("token", JSON.stringify(data.token));
        dispatch({ type: USER_LOGIN });
      } else {
        dispatch({ type: USER_LOGIN_ERROR, payload: "wrong credentials" });
      }
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
  localStorage.removeItem("token");
  dispatch({ type: USER_LOGOUT });
};
