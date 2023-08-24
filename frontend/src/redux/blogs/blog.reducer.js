import {
  BLOG_LOADING,
  BLOG_ERROR,
  GET_BLOGS,
  GET_MY_BLOGS,
  RESET_BLOG,
} from "./blog.action-type";

const initialState = {
  loading: false,
  error: false,
  blogs: [],
  my_blogs: [],
};

const BlogReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case BLOG_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case BLOG_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case GET_BLOGS: {
      return {
        ...state,
        loading: false,
        blogs: payload,
      };
    }
    case GET_MY_BLOGS: {
      return {
        ...state,
        loading: false,
        my_blogs: payload,
      };
    }
    case RESET_BLOG: {
      return {
        loading: false,
        error: false,
        blogs: [],
        my_blogs: [],
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default BlogReducer;
