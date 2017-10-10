import React, {Component} from 'react';
import {Grid, Card, CardContent, Typography} from 'material-ui';

import * as views from './';

export class HomeView extends Component {
  render() {
    return (
      <Grid container>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography type="display1">
                Courses
              </Typography>
              <views.CourseList />
            </CardContent>
          </Card>
        </Grid>
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
      </Grid>
    );
  }
}
