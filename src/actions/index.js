// importing constants
import {
  GET_POSTS,
  GET_POSTS_ERROR,
  GET_SINGLE_POST,
  GET_SINGLE_POST_ERROR,
  CREATE_POST,
  CREATE_POST_ERROR,
  DELETE_POST,
  DELETE_POST_ERROR,
  UPDATE_POST,
  UPDATE_POST_ERROR
} from "./types";
// importing axios for creating requests
import axios from "axios";

// this method makes a get request to JSON placeholder for 20 posts
export const getPosts = () => dispatch => {
  axios
    .get("https://jsonplaceholder.typicode.com/posts?_limit=20")
    .then(response =>
      dispatch({
        type: GET_POSTS,
        payload: response.data
      })
    )
    .catch(e => dispatch({ type: GET_POSTS_ERROR, payload: e }));
};

// this method makes a request to JSON placeholder, we ask to send back a specific post
export const getSinglePost = id => dispatch => {
  axios
    .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(response =>
      dispatch({
        type: GET_SINGLE_POST,
        payload: response.data
      })
    )
    .catch(e => dispatch({ type: GET_SINGLE_POST_ERROR, payload: e }));
};

// this method creates a fake post on JSON placeholder
export const createPost = data => dispatch => {
  axios
    .post("https://jsonplaceholder.typicode.com/posts", data)
    .then(response =>
      dispatch({
        type: CREATE_POST,
        payload: response.data
      })
    )
    .catch(e => dispatch({ type: CREATE_POST_ERROR, payload: e }));
};

// this method deletes a post from our current posts array
export const deletePost = id => dispatch => {
  axios
    .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(response =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(e => dispatch({ type: DELETE_POST_ERROR, payload: e }));
};

// this method updates a specific post
export const updatePost = data => dispatch => {
  axios
    .put(`https://jsonplaceholder.typicode.com/posts/${data.id}`, data)
    .then(response =>
      dispatch({
        type: UPDATE_POST,
        payload: response.data
      })
    )
    .catch(e => dispatch({ type: UPDATE_POST_ERROR, payload: e }));
};
