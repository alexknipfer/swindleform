export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  root?: Maybe<Scalars['String']>;
  user: User;
  workspace?: Maybe<Workspace>;
};

export type QueryWorkspaceArgs = {
  workspaceId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  root?: Maybe<Scalars['String']>;
  createWorkspace: Workspace;
};

export type MutationCreateWorkspaceArgs = {
  name: Scalars['String'];
};

export type Workspace = {
  __typename?: 'Workspace';
  id: Scalars['ID'];
  users: Array<Scalars['String']>;
  workspaceName: Scalars['String'];
  formCount: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  workspaces: Array<Workspace>;
};
