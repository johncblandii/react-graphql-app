// @flow

import {map, value} from 'redux-data-structures';

export const students = map({
  addActionTypes: ['ADD_STUDENT'],
  changeActionTypes: ['UPDATE_STUDENT'],
  removeActionTypes: ['REMOVE_STUDENT'],
});

export const selectedStudent = value({
  setActionTypes: ['SET_SELECTED_STUDENT'],
  resetActionTypes: ['REMOVE_SELECTED_STUDENT'],
})
