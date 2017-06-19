import React from 'react';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';

const Home = function () {
  return (
    <div>
      <Jumbotron>
        <h1>Statistical Business Register User Interface</h1>
        <h3>Welcome to your portal - Here you can access the SBR API.</h3>
        <br />
        <p>Below is a list of the UI features;</p>
        <ul>
          <li><b>Feature 1</b>: Description...</li>
          <li><b>Feature 2</b>: Description...</li>
          <li><b>Feature 3</b>: Description...</li>
        </ul>
      </Jumbotron>
    </div>
  );
};

export default Home;
