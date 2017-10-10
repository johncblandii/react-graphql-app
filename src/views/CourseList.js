// @flow
/*eslint no-restricted-globals: ["off", "confirm"]*/

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {IconButton, List, ListItem, ListItemSecondaryAction, ListItemText} from 'material-ui';
import {Close as CloseIcon} from 'material-ui-icons';

import * as actions from '../redux';

class CourseListComponent extends Component {
  static propTypes = {
    allowDelete: PropTypes.bool,
    allowSelection: PropTypes.bool,
    courses: PropTypes.object.isRequired,
    deleteCourse: PropTypes.func.isRequired,
    selectCourse: PropTypes.func.isRequired,
  }

  static defaultProps = {
    allowSelection: true,
    allowDelete: true,
  }

  render() {
    if (!this.props.courses || this.props.courses.allIds.length === 0) return null;

    return (
      <List>
        {this.props.courses.allIds.map(this._renderCourse)}
      </List>
    );
  }

  _renderCourse = (id) => {
    return (
      <div key={id}>
        <ListItem divider button={this.props.allowSelection} onClick={() => this._onSelect(id)}>
          <ListItemText inset primary={this.props.courses.byId[id].name} />
          {this.props.allowDelete && <ListItemSecondaryAction>
            <IconButton aria-label="Close" onClick={() => this._onCourseDelete(id)}>
              <CloseIcon />
            </IconButton>
          </ListItemSecondaryAction>}
        </ListItem>
      </div>
    );
  }

  _onCourseDelete = (id) => {
    if (confirm('Are you sure?')) this.props.deleteCourse(id);
  }

  _onSelect = (id) => {
    if (!this.props.allowSelection) return;

    this.props.selectCourse(id);
  }
}

const mapStateToProps = (state) => {
  console.log(state.selectedCourse);
  return {
    courses: state.courses,
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    deleteCourse: (courseId: number) => {
      dispatch(actions.deleteCourse(courseId));
    },
    selectCourse: (courseId: number) => {
      dispatch(actions.selectCourse(courseId));
    }
  }
}

export const CourseList = connect(mapStateToProps, mapActionsToProps)(CourseListComponent);
