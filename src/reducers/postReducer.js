import {
  CREATE_POST,
  CREATE_POST_ERROR,
  DELETE_POST,
  DELETE_POST_ERROR,
  UPDATE_POST,
  UPDATE_POST_ERROR,
  GET_POSTS,
  GET_SINGLE_POST,
  GET_POSTS_ERROR,
  GET_SINGLE_POST_ERROR
} from "../actions/types";

const initialState = {
  posts: [],
  post: {},
  error: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_POST:
      return { ...state, posts: [action.payload, ...state.posts] };
    case CREATE_POST_ERROR:
      return { ...state, error: action.payload };
    case GET_POSTS:
      return { ...state, posts: action.payload };
    case GET_POSTS_ERROR:
      return { ...state, error: action.payload };
    case GET_SINGLE_POST:
      return { ...state, post: action.payload };
    case GET_SINGLE_POST_ERROR:
      return { ...state, error: action.payload };
    case UPDATE_POST:
      return { ...state, post: action.payload };
    case UPDATE_POST_ERROR:
      return { ...state, error: action.payload };
    case DELETE_POST:
      const newPosts = state.posts.filter(doc => doc.id !== action.payload);
      return { ...state, posts: newPosts };
    case DELETE_POST_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
