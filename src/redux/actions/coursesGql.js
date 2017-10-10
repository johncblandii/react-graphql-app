export const AllCoursesQuery = `
query allCourses {
  allCourses {
    id
    name
    description
    level
  }
}`;

export const CreateCourseMutation = `
mutation($name: String!, $description: String!, $level: String!) {
  createCourse (
    name: $name
    description: $description
    level: $level
) {
    id
    name
    description
    level
  }
}
`;

export const UpdateCourseMutation = `
mutation($id:ID!, $name: String!, $description: String!, $level: String!) {
  updateCourse (
    id: $id
    name: $name
    description: $description
    level: $level
) {
    id
    name
    description
    level
  }
}
`;

export const DeleteCourseMutation = `
mutation($id:ID!) {
  deleteCourse (
    id: $id
  ) {
    id
    name
    description
    level
  }
}
`;
