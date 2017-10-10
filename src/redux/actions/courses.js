// @flow

import {request} from 'graphql-request';

const AllCoursesQuery = `
  query allCourses {
    allCourses {
      id
      name
      description
      level
    }
  }`;

export function loadCourses() {
  return (dispatch: Function) => {
    request('https://api.graph.cool/simple/v1/cj864jf2302n30112ip74zkoy', AllCoursesQuery)
      .then((data) => {
        data.allCourses.map((course) => {
          dispatch({
            type: 'ADD_COURSE',
            payload: course,
          })
        })
      });
  };
}

export function deleteCourse(courseId: number) {
  return (dispatch: Function) => {
  }
}

export function selectCourse(courseId: number) {
  return {
    type: 'SET_SELECTED_COURSE',
    payload: courseId,
  };
}
