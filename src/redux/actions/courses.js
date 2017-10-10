// @flow

export function loadCourses() {
  return (dispatch: Function) => {
    // TODO: load data
  };
}

export function deleteCourse(courseId: number) {
  return (dispatch: Function) => {
    console.log(`DELETING`, courseId);
  }
}
