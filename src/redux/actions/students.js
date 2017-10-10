// @flow

import {request} from 'graphql-request';

const fragments = {
  courses: `
    fragment courseFields on Course {
      id
      name
      description
      level
    }
  `
};

const AllStudentsQuery = `
query allStudents {
  allStudents {
    id
    firstName
    lastName
    active
    courses {
      ...courseFields
    }
  }
}
${fragments.courses}
`;

export function loadStudents() {
  return (dispatch: Function) => {
    request('https://api.graph.cool/simple/v1/cj864jf2302n30112ip74zkoy', AllStudentsQuery)
      .then((data) => {
        data.allStudents.map((student) => {
          dispatch({
            type: 'ADD_STUDENT',
            payload: student,
          })
        })
      });
  };
}

export function deleteStudent(studentId: number) {
  return (dispatch: Function) => {
  };
}

export function selectStudent(studentId: number) {
  return {
    type: 'SET_SELECTED_STUDENT',
    payload: studentId,
  };
}
