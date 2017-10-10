// @flow
/*eslint no-restricted-globals: ["off", "confirm"]*/

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {IconButton, List, ListItem, ListItemSecondaryAction, ListItemText} from 'material-ui';
import {Close as CloseIcon} from 'material-ui-icons';

import * as actions from '../redux';

class StudentListComponent extends Component {
  static propTypes = {
    students: PropTypes.object.isRequired,
    deleteStudent: PropTypes.func.isRequired,
  }

  render() {
    if (!this.props.students || this.props.students.allIds.length === 0) return null;

    return (
      <List>
        {this.props.students.allIds.map(this._renderStudent)}
      </List>
    );
  }

  _renderStudent = (id) => {
    return (
      <div key={id}>
        <ListItem divider>
          <ListItemText inset primary={this.props.students.byId[id].name} />
          <ListItemSecondaryAction>
            <IconButton aria-label="Close" onClick={() => this._onDelete(id)}>
              <CloseIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </div>
    );
  }

  _onDelete = (id) => {
    if (confirm('Are you sure?')) this.props.deleteStudent(id);
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.students,
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    deleteStudent: (studentId: number) => {
      dispatch(actions.deleteStudent(studentId));
    }
  }
}

export const StudentList = connect(mapStateToProps, mapActionsToProps)(StudentListComponent);
