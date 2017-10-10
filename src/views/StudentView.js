import React, {Component} from 'react';
import {Grid, Card, CardContent, Typography} from 'material-ui';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import * as views from './';

class StudentViewComponent extends Component {
  static propTypes = {
    currentStudent: PropTypes.object,
  };

  render() {
    return (
      <Grid container>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography type="display1">
                Students
              </Typography>
              <views.StudentList currentStudent={this.props.currentStudent} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography type="display1">
                {this.props.currentStudent && this.props.currentStudent.id ? 'Edit' : 'Create'}
              </Typography>
              <views.StudentForm />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  const currentStudent = (state.students && state.students.byId[state.selectedStudent]) || {};

  return {
    currentStudent
  }
}

export const StudentView = connect(mapStateToProps)(StudentViewComponent);
