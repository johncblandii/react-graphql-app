import {map} from 'redux-data-structures';

export const courses = map({
  initialState: {
    byId: {
      0: {
        title: 'My Favorite Course',
      }
    },
    allIds: [0]
  }
});
