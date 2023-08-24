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
export const addNewBlog =
  ({ title, content, image, blogs, my_blogs }) =>
  async (dispatch) => {
    try {
      dispatch({ type: BLOG_LOADING });

      const res = await fetch(`https://blog-server-vzh9.onrender.com/blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
        body: JSON.stringify({ title, content, image }),
      });
      const data = await res.json();
      if (data.data) {
        let updatedBlogs = [...blogs, data.data];
        let updatedMyBlogs = [...my_blogs, data.data];
        dispatch({ type: GET_BLOGS, payload: updatedBlogs });
        dispatch({ type: GET_MY_BLOGS, payload: updatedMyBlogs });
      }
    } catch (error) {
      dispatch({ type: BLOG_ERROR });
    }
  };

export const deleteBlog =
  ({ _id, blogs, my_blogs }) =>
  async (dispatch) => {
    try {
      dispatch({ type: BLOG_LOADING });

      const res = await fetch(
        `https://blog-server-vzh9.onrender.com/blog/${_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      const data = await res.json();
      if (data.msg === "Blog deleted successfully") {
        let updatedBlogs = blogs.filter((blog) => blog._id !== _id);
        let updatedMyBlogs = my_blogs.filter((blog) => blog._id !== _id);
        dispatch({ type: GET_BLOGS, payload: updatedBlogs });
        dispatch({ type: GET_MY_BLOGS, payload: updatedMyBlogs });
      }
    } catch (error) {
      dispatch({ type: BLOG_ERROR });
    }
  };
export const updateBlog =
  ({ updateTitle, updateContent, updateImage, _id, blogs, my_blogs }) =>
  async (dispatch) => {
    try {
      dispatch({ type: BLOG_LOADING });

      const res = await fetch(
        `https://blog-server-vzh9.onrender.com/blog/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(localStorage.getItem("token")),
          },
          body: JSON.stringify({
            title: updateTitle,
            content: updateContent,
            image: updateImage,
          }),
        }
      );
      const data = await res.json();
      if (data.blog) {
        const updatedBlogs = blogs.map((blog) => {
          if (blog._id === data.blog._id) {
            return data.blog;
          }
          return blog;
        });
        const updatedMyBlogs = my_blogs.map((blog) => {
          if (blog._id === data.blog._id) {
            return data.blog;
          }
          return blog;
        });

        dispatch({ type: GET_BLOGS, payload: updatedBlogs });
        dispatch({ type: GET_MY_BLOGS, payload: updatedMyBlogs });
      }
    } catch (error) {
      dispatch({ type: BLOG_ERROR });
    }
  };

export const likeBlog =
  ({ _id, blogs, my_blogs }) =>
  async (dispatch) => {
    try {
      dispatch({ type: BLOG_LOADING });

      const res = await fetch(
        `https://blog-server-vzh9.onrender.com/like-blog/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();

      if (data.data) {
        const updatedBlogs = blogs.map((blog) => {
          if (blog._id === data.data._id) {
            return {
              ...blog,
              likes: blog.likes + 1,
            };
          }
          return blog;
        });
        const updatedMyBlogs = my_blogs.map((blog) => {
          if (blog._id === data.data._id) {
            return {
              ...blog,
              likes: blog.likes + 1,
            };
          }
          return blog;
        });

        dispatch({ type: GET_BLOGS, payload: updatedBlogs });
        dispatch({ type: GET_MY_BLOGS, payload: updatedMyBlogs });
      }
    } catch (error) {
      dispatch({ type: BLOG_ERROR });
    }
  };

export const dislikeBlog =
  ({ _id, blogs, my_blogs }) =>
  async (dispatch) => {
    try {
      dispatch({ type: BLOG_LOADING });

      const res = await fetch(
        `https://blog-server-vzh9.onrender.com/dislike-blog/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data.data) {
        const updatedBlogs = blogs.map((blog) => {
          if (blog._id === data.data._id) {
            return {
              ...blog,
              dislikes: blog.dislikes + 1,
            };
          }
          return blog;
        });
        const updatedMyBlogs = my_blogs.map((blog) => {
          if (blog._id === data.data._id) {
            return {
              ...blog,
              dislikes: blog.dislikes + 1,
            };
          }
          return blog;
        });

        dispatch({ type: GET_BLOGS, payload: updatedBlogs });
        dispatch({ type: GET_MY_BLOGS, payload: updatedMyBlogs });
      }
    } catch (error) {
      dispatch({ type: BLOG_ERROR });
    }
  };

export const resetBlogs = () => (dispatch) => {
  dispatch({ type: RESET_BLOG });
};
