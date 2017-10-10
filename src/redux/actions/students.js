// @flow

export function loadStudents() {
  return (dispatch: Function) => {
    // TODO: load data
  };
}

export function deleteStudent(studentId: number) {
  return (dispatch: Function) => {
    console.log(`DELETING`, studentId);
  }
}
