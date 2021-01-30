export interface User {
  _id: string;
  email: string;
  workspaces: string[];
}

export interface UserResponse extends Omit<User, 'workspaces'> {
  workspaces: UserWorkspace[];
}

export interface UserWorkspace {
  id: string;
  workspaceName: string;
  users: string[];
  formCount: number;
}
