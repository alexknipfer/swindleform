import { ObjectId } from 'mongodb';

export interface User {
  _id: ObjectId;
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
