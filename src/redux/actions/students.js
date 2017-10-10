// @flow

import {request} from 'graphql-request';

import {GraphURL} from './constants';
import {AllStudentsQuery, CreateStudentMutation, UpdateStudentMutation, DeleteStudentMutation} from './studentsGql';

// Loads students
//
// Dispatches ADD_STUDENT for each student returned to normalize the data
export function loadStudents() {
  return (dispatch : Function) => {
    request(GraphURL, AllStudentsQuery).then((data) => {
      data
        .allStudents
        .forEach((student) => {
          dispatch({type: 'ADD_STUDENT', payload: student});
        })
    });
  };
}

// Delete a student by `studentId`
//
// Dispatches REMOVE_STUDENT to remove the student from the store
export function deleteStudent(studentId : number) {
  return (dispatch : Function) => {
    request(GraphURL, DeleteStudentMutation, {id: studentId}).then((data) => {
      dispatch({
        type: 'REMOVE_STUDENT',
        payload: {
          id: studentId
        }
      });
    })
  };
}

// Create a student
//
// Dispatches `loadStudents` to reload the student list
export function createStudent(student : object) {
  return (dispatch : Function) => {
    request(GraphURL, CreateStudentMutation, student).then((data) => {
      dispatch(loadStudents());
    })
  };
}

// Update a student
//
// Dispatches `deselectStudent` immediately to clear the selection.
//
// On complete, dispatches `loadStudents` to reload the student list.
export function updateStudent(student : object) {
  return (dispatch : Function) => {
    dispatch(deselectStudent());

    request(GraphURL, UpdateStudentMutation, student).then((data) => {
      dispatch(loadStudents());
    })
  };
}

// Selects a student by `id`
//
// Dispatches `SET_SELECTED_STUDENT` with `id` as the payload
export function selectStudent(id : number) {
  return {type: 'SET_SELECTED_STUDENT', payload: id};
}

// Deselects the student
//
// Dispatches `REMOVE_SELECTED_STUDENT` with `id` as the payload
export function deselectStudent() {
  return {type: 'REMOVE_SELECTED_STUDENT'};
}
