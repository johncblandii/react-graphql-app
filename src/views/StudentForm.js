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
    deleteStudent: PropTypes.func.isRequired,
    isSelectable: PropTypes.bool,
    selectStudent: PropTypes.func.isRequired,
    students: PropTypes.object.isRequired,
  }

  static defaultProps = {
    isSelectable: true
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
        <ListItem divider button={this.props.isSelectable} onClick={() => this._onSelect(id)}>
          <ListItemText inset primary={`${this.props.students.byId[id].firstName} ${this.props.students.byId[id].lastName}`} />
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

  _onSelect = (id) => {
    if (!this.props.isSelectable) return;

    this.props.selectStudent(id);
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.students,
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    createStudent: (student: number) => {
      dispatch(actions.selectStudent(studentId));
    },
    updateStudent: (student: number) => {
      dispatch(actions.selectStudent(studentId));
    }
  }
}

export const StudentList = connect(mapStateToProps, mapActionsToProps)(StudentListComponent);
