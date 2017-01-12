import React from 'react';
import CoursePreview from './CoursePreview';
import courses from '../data/courses';

export default class IndexPage extends React.Component {
  render() {
    return (
      <div className="home">
        <div className="listing"><strong>COURSE LISTING</strong></div>
        <div className="courses-selector">
          {courses.map(course => {
            return <CoursePreview key={course.id} {...course} />
          })}
        </div>
      </div>
    );
  }
}