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
    allowDelete: PropTypes.bool,
    allowSelection: PropTypes.bool,
    currentStudent: PropTypes.object,
    deleteStudent: PropTypes.func.isRequired,
    selectStudent: PropTypes.func.isRequired,
    students: PropTypes.object.isRequired
  }

  static defaultProps = {
    allowDelete: true,
    allowSelection: true
  }

  render() {
    if (!this.props.students || this.props.students.allIds.length === 0)
      return null;

    return (
      <List>
        {this
          .props
          .students
          .allIds
          .map(this._renderStudent)}
      </List>
    );
  }

  _renderStudent = (id : string) => {
    // TODO: use this to denote the selection state?
    // let isSelected = this.props.currentStudent && this.props.currentStudent.id !== undefined;

    let name = `${this.props.students.byId[id].firstName} ${this.props.students.byId[id].lastName}`;

    return (
      <div key={id}>
        <ListItem
          button={this.props.allowSelection}
          divider
          onClick={() => this._onSelect(id)}>
          <ListItemText inset primary={name}/> {this._renderDelete(id)}
        </ListItem>
      </div>
    );
  }

  _renderDelete = (id : string) => {
    if (!this.props.allowDelete)
      return;

    return (
      <ListItemSecondaryAction>
        <IconButton aria-label="Close" onClick={() => this._onDelete(id)}>
          <CloseIcon/>
        </IconButton>
      </ListItemSecondaryAction>
    );
  }

  _onDelete = (id) => {
    if (confirm('Are you sure?'))
      this.props.deleteStudent(id);
    }

  _onSelect = (id) => {
    if (!this.props.allowSelection)
      return;

    this
      .props
      .selectStudent(id);
  }
}

const mapStateToProps = (state) => {
  return {students: state.students}
}

const mapActionsToProps = (dispatch) => {
  return {
    deleteStudent: (studentId : number) => {
      dispatch(actions.deleteStudent(studentId));
    },
    selectStudent: (studentId : number) => {
      dispatch(actions.selectStudent(studentId));
    }
  }
}

export const StudentList = connect(mapStateToProps, mapActionsToProps)(StudentListComponent);
