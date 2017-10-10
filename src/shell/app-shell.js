import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  AppBar,
  Divider,
  Drawer,
  List,
  IconButton,
  Toolbar,
  Typography,
  withStyles
} from 'material-ui';
import {ChevronLeft as ChevronLeftIcon, Menu as MenuIcon} from 'material-ui-icons';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'

import {mainNavigationItems} from './app-menu';
import appShellStyles from './app-shell-styles';

class AppShellComponent extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      open: false
    }
  }

  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
            <Toolbar disableGutters={!this.state.open}>
              <IconButton
                color="contrast"
                aria-label="open drawer"
                onClick={this.onDrawerOpen}
                className={classNames(classes.menuButton, this.state.open && classes.hide)}>
                <MenuIcon/>
              </IconButton>
              <Typography type="title" color="inherit" noWrap>
                {this.props.title}
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            type="permanent"
            classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose)
          }}
            open={this.state.open}>
            <div className={classes.drawerInner}>
              <div className={classes.drawerHeader}>
                <IconButton onClick={this.onDrawerClose}>
                  <ChevronLeftIcon/>
                </IconButton>
              </div>
              <Divider/>
              <List className={classes.list}>
                {mainNavigationItems}
              </List>
            </div>
          </Drawer>
          <main className={classes.content}>
            {this.props.children}
          </main>
        </div>
      </div>
    );
  }

  onDrawerOpen = () => {
    this.setState({open: true});
  };

  onDrawerClose = () => {
    this.setState({open: false});
  };
}

export const AppShell = withRouter(withStyles(appShellStyles)(connect()(AppShellComponent)));
