const fragments = {
  courses: `
    fragment courseFields on Course {
      id
      name
      description
      level
    }
  `
};

export const AllStudentsQuery = `
query allStudents {
  allStudents {
    id
    firstName
    lastName
    active
    courses {
      ...courseFields
    }
  }
}
${fragments.courses}
`;

export const CreateStudentMutation = `
mutation($firstName: String!, $lastName: String!, $active: Boolean!, $coursesIds: [ID!]!) {
  createStudent (
    firstName: $firstName
    lastName: $lastName
    active: $active
    coursesIds: $coursesIds
) {
    id
    firstName
    lastName
    active
  }
}
`;

export const UpdateStudentMutation = `
mutation($id:ID!, $firstName: String!, $lastName: String!, $active: Boolean!, $coursesIds: [ID!]!) {
  updateStudent (
    id: $id
    firstName: $firstName
    lastName: $lastName
    active: $active
    coursesIds: $coursesIds
) {
    id
    firstName
    lastName
    active
  }
}
`;

export const DeleteStudentMutation = `
mutation($id:ID!) {
  deleteStudent (
    id: $id
  ) {
    id
    firstName
    lastName
    active
  }
}
`;
