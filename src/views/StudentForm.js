// @flow
/*eslint no-restricted-globals: ["off", "confirm"]*/

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, Checkbox, FormLabel, FormGroup, FormControlLabel, TextField} from 'material-ui';

import * as actions from '../redux';

class StudentFormComponent extends Component {
  static propTypes = {
    currentStudent: PropTypes.object,
    createStudent: PropTypes.func.isRequired,
    updateStudent: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      form: {
        active: (props.currentStudent && props.currentStudent.active) || false,
        coursesIds:  (props.currentStudent && props.currentStudent.courses && props.currentStudent.courses.map((course) => course.id)) || [],
        firstName: (props.currentStudent && props.currentStudent.firstName) || '',
        lastName: (props.currentStudent && props.currentStudent.lastName) || '',
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentStudent !== this.props.currentStudent) {
      this.setState({
        form: {
          active: (nextProps.currentStudent && nextProps.currentStudent.active) || false,
          coursesIds:  (nextProps.currentStudent && nextProps.currentStudent.courses && nextProps.currentStudent.courses.map((course) => course.id)) || [],
          firstName: (nextProps.currentStudent && nextProps.currentStudent.firstName) || '',
          lastName: (nextProps.currentStudent && nextProps.currentStudent.lastName) || '',
        }
      });
    }
  }

  render() {
    return (
      <div>
        {this._renderForm()}
        {this._renderCourses()}
        <FormGroup row>
          <Button onClick={this._onSave}>Save</Button>
          <Button onClick={this._onCancel}>Cancel</Button>
        </FormGroup>
      </div>
    );
  }

  _renderForm = () => {
    return (
      <div>
        <FormGroup>
          <TextField
            id="firstName"
            label="First Name"
            onChange={this._onChange}
            value={this.state.form.firstName}
          />
          <TextField
            id="lastName"
            label="Last Name"
            onChange={this._onChange}
            value={this.state.form.lastName}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.form.active}
                onChange={this._onCheckboxChange('active')}
                value='active'
                /> }
            label='Active?'
          />
        </FormGroup>
      </div>
    )
  }

  _renderCourses = () => {
    return (
      <FormGroup>
        <FormLabel component="legend">Enrolled Courses</FormLabel>
        <div style={{paddingLeft: 20}}>
        {this.props.courses.allIds.map(this._renderCourse)}
        </div>
      </FormGroup>
    );
  }

  _renderCourse = (id) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={this.state.form.coursesIds.indexOf(id) !== -1}
            onChange={this._onCourseChange(id)}
            value='active'
            /> }
        key={this.props.courses.byId[id].id}
        label={this.props.courses.byId[id].name}
      />
    );
  }

  _onChange = (event) => {
    let id = event.nativeEvent.target.id;
    this.setState({form: {...this.state.form, [id]: event.nativeEvent.target.value}});
  }

  _onCheckboxChange = name => (event, checked) => {
    this.setState({form: {...this.state.form, [name]: checked}});
  }

  _onCourseChange = id => (event, checked) => {
    let coursesIds = [...this.state.form.coursesIds];

    if (checked) {
      coursesIds.push(id);
    } else {
      coursesIds.splice(coursesIds.indexOf(id), 1);
    }

    console.log(coursesIds);

    this.setState({form: {...this.state.form, coursesIds}});
  }

  _onSave = () => {
    let form = {...this.state.form};

    if (this.props.currentStudent && this.props.currentStudent.id) {
      this.props.updateStudent({...form, id: this.props.currentStudent.id});
    } else {
      this.props.createStudent(form);
    }
  }

  _onCancel = () => {
    this.setState({});
    this.props.deselectStudent();
  }
}

const mapStateToProps = (state) => {
  const currentStudent = (state.students && state.students.byId[state.selectedStudent]) || {};

  return {
    currentStudent,
    courses: state.courses,
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    deselectStudent: () => {
      dispatch(actions.deselectStudent());
    },
    createStudent: (student: number) => {
      dispatch(actions.createStudent(student));
    },
    updateStudent: (student: number) => {
      dispatch(actions.updateStudent(student));
    }
  }
}

export const StudentForm = connect(mapStateToProps, mapActionsToProps)(StudentFormComponent);
