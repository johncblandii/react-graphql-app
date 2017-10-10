import {map, value} from 'redux-data-structures';

export const courses = map({
  addActionTypes: ['ADD_COURSE'],
  changeActionTypes: ['UPDATE_COURSE'],
  removeActionTypes: ['REMOVE_COURSE']
});

export const selectedCourse = value({
  setActionTypes: ['SET_SELECTED_COURSE'],
  resetActionTypes: ['REMOVE_SELECTED_COURSE'],
})
