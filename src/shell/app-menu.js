// @flow

import React from 'react';
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import {Home, List, Face} from 'material-ui-icons';
import {Link} from 'react-router-dom';

export const mainNavigationItems = (
  <div>
    <Link to={'/'}>
      <ListItem button>
          <ListItemIcon>
            <Home/>
          </ListItemIcon>
          <ListItemText primary="Home"/>
      </ListItem>
    </Link>
    <Link to={'/students'}>
      <ListItem button>
        <ListItemIcon>
          <Face/>
        </ListItemIcon>
        <ListItemText primary="Students"/>
      </ListItem>
    </Link>
    <Link to={'/courses'}>
      <ListItem button>
        <ListItemIcon>
          <List/>
        </ListItemIcon>
        <ListItemText primary="Courses"/>
      </ListItem>
    </Link>
  </div>
);
