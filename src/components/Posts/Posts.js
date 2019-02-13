// importing react for our component
import React from "react";
// importing prop types for props control
import PropTypes from "prop-types";
import { Card } from "../Card/Card";
// importing connect for connecting this component to redux to access store state
import { connect } from "react-redux";
// importing actions for dispatching them inside this component
import { getPosts, createPost, deletePost } from "../../actions/index";

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: false,
      toggle: false,
      title: "",
      body: "",
      errors: []
    };
    this.toggleForm = this.toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleDeletPostClick = this.handleDeletPostClick.bind(this);
  }

  // lifecyle, on mount dispatch action to fetch a specific post
  componentDidMount() {
    this.props.getPosts();
  }

  // dispatch delete action
  handleDeletPostClick(id) {
    this.props.deletePost(id);
  }

  // hide show elements
  toggleForm() {
    this.setState({
      toggle: !this.state.toggle
    });
  }

  // update state for inputs and textarea
  handleChange(e) {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({
      [name]: val
    });
  }

  // dispatch action on submit
  handleFormSubmit(e) {
    e.preventDefault();
    this.props.createPost({ title: this.state.title, body: this.state.body });
    this.setState({
      title: "",
      body: "",
      toggle: !this.state.toggle
    });
  }

  render() {
    // map over our posts a create card components
    const cards = this.props.posts.map(post => (
      <Card
        key={post.id}
        id={post.id}
        title={post.title}
        body={post.body}
        onClick={this.handleDeletPostClick}
      />
    ));
    const disableUpdateBtn = !this.state.title || !this.state.body;
    return (
      <div className='container my-5'>
        <div className='row'>
          <div className='col-sm-12 col-md-6'>
            <p className='lead'>Create a post and upload it</p>
            {!this.state.toggle && (
              <button className='btn btn-warning' onClick={this.toggleForm}>
                create post
              </button>
            )}
          </div>
        </div>
        {this.state.toggle && (
          <form onSubmit={this.handleFormSubmit}>
            <div className='form-group'>
              <input
                type='text'
                name='title'
                className='form-control'
                placeholder='title'
                onChange={this.handleChange}
              />
            </div>
            <div className='form-group'>
              <textarea
                name='body'
                className='form-control'
                cols='30'
                rows='10'
                placeholder='body'
                onChange={this.handleChange}
              />
            </div>
            <div className='form-group'>
              <input
                type='submit'
                value='Upload'
                className='btn btn-info'
                disabled={disableUpdateBtn}
              />
              <button
                type='button'
                className='btn btn-danger mx-2'
                onClick={this.toggleForm}
              >
                cancel
              </button>
            </div>
          </form>
        )}
        <div className='d-flex flex-wrap justify-content-between my-5'>
          {cards}
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  createPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    posts: state.posts.posts,
    error: state.posts.error
  };
};

export default connect(
  mapStateToProps,
  { getPosts, createPost, deletePost }
)(Posts);
