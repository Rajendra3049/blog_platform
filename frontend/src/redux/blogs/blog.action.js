import {
  BLOG_LOADING,
  BLOG_ERROR,
  GET_BLOGS,
  GET_MY_BLOGS,
  LIKE_BLOG,
  DISLIKE_BLOG,
  ADD_NEW_BLOG,
  DELETE_BLOG,
  UPDATE_BLOG,
  RESET_BLOG,
} from "./blog.action-type";
export const getAllBlogs = () => async (dispatch) => {
  try {
    dispatch({ type: BLOG_LOADING });

    const res = await fetch(`https://blog-server-vzh9.onrender.com/blogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    dispatch({ type: GET_BLOGS, payload: data.data });
  } catch (error) {
    dispatch({ type: BLOG_ERROR });
  }
};
export const getMyBlogs = () => async (dispatch) => {
  try {
    dispatch({ type: BLOG_LOADING });

    const res = await fetch(`https://blog-server-vzh9.onrender.com/my-blogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    const data = await res.json();
    dispatch({ type: GET_MY_BLOGS, payload: data.data });
  } catch (error) {
    dispatch({ type: BLOG_ERROR });
  }
};

export const resetBlogs = () => (dispatch) => {
  dispatch({ type: RESET_BLOG });
};
