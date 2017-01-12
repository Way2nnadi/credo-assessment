import React from 'react';
import { Link } from 'react-router';
import courses from '../data/courses';

export default class Layout extends React.Component {

  render() {
    return (
      <div className="app-container">
        <header>
          <Link to="/">
            <img className="logo" src="/img/credo_logo.png"/>
          </Link>
          <p>
            Welcome Student to <strong>University of Credo</strong> course enrollment page.
          </p>
        </header>
        <div className="app-content">{React.cloneElement(this.props.children, {courses})}</div>
      </div>
    );
  }
}