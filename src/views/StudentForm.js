// @flow
/*eslint no-restricted-globals: ["off", "confirm"]*/

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, Checkbox, FormGroup, FormControlLabel, TextField} from 'material-ui';

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

  _onChange = (event) => {
    let id = event.nativeEvent.target.id;
    this.setState({form: {...this.state.form, [id]: event.nativeEvent.target.value}});
  }

  _onCheckboxChange = name => (event, checked) => {
    this.setState({form: {...this.state.form, [name]: checked}});
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
