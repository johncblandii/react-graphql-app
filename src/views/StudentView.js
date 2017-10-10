import React, {Component} from 'react';
import {Grid, Card, CardContent, Typography} from 'material-ui';

import * as views from './';

export class StudentView extends Component {
  render() {
    return (
      <Grid container>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography type="display1">
                Students
              </Typography>
              <views.StudentList />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography type="display1">
                Form
              </Typography>
              <views.StudentForm />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}
