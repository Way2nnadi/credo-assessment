import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import CoursePage from './components/CoursePage';
import CourseTotal from './components/CourseTotal';

import NotFoundPage from './components/NotFoundPage';

const appRoutes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={IndexPage}/>
    <Route path="course/:id" component={CourseTotal}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default appRoutes;