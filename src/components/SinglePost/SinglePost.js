// importing react for our component
import React from "react";
// importing prop types for props control
import PropTypes from "prop-types";
// importing connect for connecting this component to redux to access store state
import { connect } from "react-redux";
// importing actions for dispatching them inside this component
import { updatePost, getSinglePost } from "../../actions/index";

// our stateful component that displays a single post
class SinglePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      title: "",
      body: "",
      postId: ""
    };
    this.toggleForm = this.toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  // lifecyle, on mount dispatch action to fetch a specific post
  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    this.props.getSinglePost(params.postId);
  }

  // lifecycle, if props have been updated please update component state
  componentDidUpdate(prevProps) {
    const {
      match: { params }
    } = this.props;
    const {
      post: { title, body }
    } = this.props;
    if (prevProps.post !== this.props.post) {
      this.setState({
        title,
        body,
        postId: params.postId
      });
    }
  }

  // show hide elements
  toggleForm() {
    this.setState({
      toggle: !this.state.toggle
    });
  }

  // update component state inputs textarea
  handleChange(e) {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({
      [name]: val
    });
  }

  // dispatch action to update this post
  handleFormSubmit(e) {
    e.preventDefault();
    const postId = JSON.parse(this.state.postId);
    this.props.updatePost({
      id: postId,
      title: this.state.title,
      body: this.state.body
    });
    this.setState({
      title: "",
      body: "",
      toggle: !this.state.toggle
    });
  }

  render() {
    return (
      <div className='container my-5'>
        <header>
          <h1>Single post</h1>
          <hr />
        </header>
        {!this.state.toggle && (
          <div className='card' style={{ width: "24rem" }}>
            <div className='card-body'>
              <h5 className='card-title'>{this.state.title}</h5>
              <p className='card-text'>{this.state.body}</p>
            </div>
            <div className='card-footer'>
              <button className='btn btn-info' onClick={this.toggleForm}>
                update
              </button>
            </div>
          </div>
        )}
        {this.state.toggle && (
          <form className='my-5' onSubmit={this.handleFormSubmit}>
            <p className='lead text-primary'>updating my post awesome :)</p>
            <div className='form-group'>
              <input
                type='text'
                name='title'
                className='form-control'
                value={this.state.title}
                onChange={this.handleChange}
              />
            </div>

            <div className='form-group'>
              <textarea
                name='body'
                className='form-control'
                cols='30'
                rows='10'
                value={this.state.body}
                onChange={this.handleChange}
              />
            </div>
            <div className='form-group'>
              <input
                type='submit'
                value='Update Post'
                className='btn btn-primary'
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
      </div>
    );
  }
}

// prop control, this is what we expect
SinglePost.propTypes = {
  getSinglePost: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  post: PropTypes.object
};

// get from our store state the things we need for this component
const mapStateToProps = state => {
  return {
    post: state.posts.post
  };
};

// connect this component to redux
export default connect(
  mapStateToProps,
  { updatePost, getSinglePost }
)(SinglePost);
