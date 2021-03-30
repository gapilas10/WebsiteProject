import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateDummyClipInput = {
  name: Scalars['String'];
  firstBead: Scalars['String'];
  secondBead: Scalars['String'];
  thirdBead: Scalars['String'];
  highlight: Scalars['String'];
  decoration: Scalars['String'];
};

export type DummyClip = {
  __typename?: 'DummyClip';
  id: Scalars['ID'];
  name: Scalars['String'];
  firstBead: Scalars['String'];
  secondBead: Scalars['String'];
  thirdBead: Scalars['String'];
  highlight: Scalars['String'];
  decoration: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createDummyClip: DummyClip;
  updateDummyClip: DummyClip;
  deleteDummyClip: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
};


export type MutationCreateDummyClipArgs = {
  data: CreateDummyClipInput;
};


export type MutationUpdateDummyClipArgs = {
  data: UpdateDummyClipInput;
  id: Scalars['String'];
};


export type MutationDeleteDummyClipArgs = {
  id: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  dummyClips: Array<DummyClip>;
  dummyClip: DummyClip;
  me?: Maybe<User>;
};


export type QueryDummyClipArgs = {
  id: Scalars['String'];
};

export type UpdateDummyClipInput = {
  name?: Maybe<Scalars['String']>;
  firstBead?: Maybe<Scalars['String']>;
  secondBead?: Maybe<Scalars['String']>;
  thirdBead?: Maybe<Scalars['String']>;
  highlight?: Maybe<Scalars['String']>;
  decoration?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'email'>
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragment
    )> }
  ) }
);

export type DummyClipsQueryVariables = Exact<{ [key: string]: never; }>;


export type DummyClipsQuery = (
  { __typename?: 'Query' }
  & { dummyClips: Array<(
    { __typename?: 'DummyClip' }
    & Pick<DummyClip, 'id' | 'name' | 'firstBead' | 'secondBead' | 'thirdBead' | 'highlight' | 'decoration'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  email
}
    `;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    errors {
      field
      message
    }
    user {
      ...RegularUser
    }
  }
}
    ${RegularUserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const DummyClipsDocument = gql`
    query DummyClips {
  dummyClips {
    id
    name
    firstBead
    secondBead
    thirdBead
    highlight
    decoration
  }
}
    `;

export function useDummyClipsQuery(options: Omit<Urql.UseQueryArgs<DummyClipsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<DummyClipsQuery>({ query: DummyClipsDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};