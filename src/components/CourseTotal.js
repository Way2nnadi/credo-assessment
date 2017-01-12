import React from 'react';
import { Link } from 'react-router';
import CoursePage from './CoursePage';
import * as cache from 'memory-cache';


export default class CourseTotal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      enrolledTotal: cache.get('total') || 0
    }

    props.courses.forEach(course => {
      const courseName = `${course.subject}${course.id}`;
      const courseEnrollment = cache.get(courseName) || 0;
      cache.put(courseName, courseEnrollment);
    })


  }

  addToTotal(){
    let total = this.state.enrolledTotal 

    if(total < 5) {
      total++;
    }

    this.setState({
      enrolledTotal: total
    });

    cache.put('total', total);
  }
  subtractFromTotal(){
    let total = this.state.enrolledTotal 


    if(total > 0) {
      total--;
    }

    this.setState({
      enrolledTotal: total
    });

    cache.put('total', total);
  }

  render () {
    return (
      <div>
        <CoursePage enrolledTotal={this.state.enrolledTotal} addToTotal={this.addToTotal.bind(this)} subtractFromTotal={this.subtractFromTotal.bind(this)} {...this.props}/>
      </div>
    );
  }
}