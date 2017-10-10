import {map} from 'redux-data-structures';

export const students = map({
  initialState: {
    byId: {
      0: {
        name: 'Lukas Begood',
      }
    },
    allIds: [0]
  }
});
