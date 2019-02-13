// importing react for creating the component
import React from "react";
// importing PropTypes for prop control
import PropTypes from "prop-types";
// importing Link for our routing links
import { Link } from "react-router-dom";

// stateless component for displaying each post inside of POSTS class
export const Card = props => {
  return (
    <div className='card my-2' style={{ width: "18rem" }}>
      <div className='card-body'>
        <h5 className='card-title'>{props.title}</h5>
        <p className='card-text'>{props.body}</p>
        {props.id > 100 && (
          <small className='text-danger'>
            view post won't display single post data because json placeholder
            does not persist this new post on the backend
          </small>
        )}
      </div>
      <div className='card-footer d-flex justify-content-between'>
        <Link to={`/posts/${props.id}`}>View Post</Link>{" "}
        <button
          className='btn btn-danger'
          onClick={() => props.onClick(props.id)}
        >
          delete
        </button>
      </div>
    </div>
  );
};

// type of props that this component expects and/or requires
Card.propTypes = {
  key: PropTypes.number,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired
};
