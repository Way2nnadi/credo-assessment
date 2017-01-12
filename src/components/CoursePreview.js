import React from 'react';
import { Link } from 'react-router';

export default class CoursePreview extends React.Component {
  render () {
    return (
      <Link to={`/course/${this.props.id}`}>
        <div className="course-title">{this.props.title}</div>
      </Link>
    );
  }
}