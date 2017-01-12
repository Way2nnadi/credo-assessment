import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from './NotFoundPage';
import * as cache from 'memory-cache';

export default class CoursePage extends React.Component {
  constructor(props) {
    super(props);

    const id = props.params.id;
    const course = props.courses.filter( course => course.id === id)[0];
    const addStatus = `You are enrolled in ${course.subject}${course.id} - ${course.title}`;
    const removeStatus = `You are currently not enrolled in ${course.subject}${course.id} - ${course.title}`;
    const maxEnroll = `You are currently enrolled in a maximum of 5 courses, and are not allowed to add any more courses`
    const status = cache.get(id) ? addStatus : removeStatus;
    const courseName = `${course.subject}${course.id}`;

    this.state = {
      id: id,
      course: course,
      name: courseName,
      status,
      add_status: addStatus,
      remove_status: removeStatus,
      max_enroll: maxEnroll,
      course_enrollment: course.enrollment,
    }
  }

  addCourse() {
    if(this.props.enrolledTotal === 5 ) {
      this.setState({
        status: this.state.max_enroll
      })
    } else if(!cache.get(this.state.id)) {
      const course = this.state.course;
      let status = this.state.add_status;
      let courseFullName = this.state.name;
      let courseEnrollment = cache.get(courseFullName);
      let realEnrollment = courseEnrollment < 20 ? ++courseEnrollment : 20;

      this.setState({
        status,
        course_enrollment: realEnrollment,
      }); 

      cache.put(this.state.id, true)
      cache.put(courseFullName, 1)
      this.props.addToTotal();
    }
  }

  removeCourse() {
  if(cache.get(this.state.id)) {
      const course = this.state.course;
      let courseFullName = this.state.name; 
      let courseEnrollment = cache.get(courseFullName);
      let realEnrollment = courseEnrollment > 0 ? --courseEnrollment : 0

      this.setState({
        status: this.state.remove_status,
        course_enrollment: realEnrollment
      });

      cache.put(courseFullName, realEnrollment)
      cache.del(this.state.id);
      this.props.subtractFromTotal();
    }

  }

  render() {
    const course = this.state.course;
    let self = this;
    if(!course) {
      return <NotFoundPage/>
    }

    const enrollment = this.state.course_enrollment;

    return (
      <div className="course-full">
        <div className="course-enroll-status">{`${this.state.status}`}</div>
        <div className="course-details">
          <div>{`Course id: ${course.id}`}</div>
          <div>{`Subject: ${course.subject}`}</div>
          <div>{`Credit: ${course.credit}`}</div>
          <div>{`Title: ${course.title}`}</div>
          <div>{`Days: ${course.days}`}</div>
          <div>{`Hours: ${course.hours}`}</div>
          <div>{`Instructor: ${course.instructor} `}</div>
          <div>{`Session: ${course.session}`}</div>
          <div>{`location: ${course.location}`}</div>
          <div>{`Current Students Enrolled: ${enrollment}/20`}</div>
          <button className="add" onClick={this.addCourse.bind(self)}>Add Course</button>
          <button className="remove" onClick={this.removeCourse.bind(self)}>Remove Course</button>
        </div>
        <div className="enrolled-total">{`Current Course Enrollment(total/max): ${self.props.enrolledTotal}/5`}</div>
        <div className="navigateBack">
          <Link to="/">« Back to the Course List</Link>
        </div>
      </div>
    )
  }
} 