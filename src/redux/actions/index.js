// @flow

import * as courses from './courses';
import * as students from './students';

export * from './courses';
export * from './students';

export function initializeData() {
  return (dispatch: Function) => {
    dispatch(students.loadStudents());
    dispatch(courses.loadCourses());
  }
}
