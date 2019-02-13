// importing react for our component
import React from "react";

// stateless component for creating our home page route
export const Home = props => {
  return (
    <header className='jumbotron jumbotron-fluid'>
      <div className='container'>
        <h2 className='display-4'>React Redux CRUD web app</h2>
        <p className='lead'>Create, Read, Update, Delete your posts</p>
      </div>
    </header>
  );
};
