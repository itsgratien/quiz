import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddTestResponse = {
  __typename?: 'AddTestResponse';
  data?: Maybe<Test>;
  error?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<ErrorsT>>;
  message?: Maybe<Scalars['String']>;
};

export type AuthenticateResponse = {
  __typename?: 'AuthenticateResponse';
  message: Scalars['String'];
};

export type ErrorsT = {
  __typename?: 'ErrorsT';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type GetUserResponse = {
  __typename?: 'GetUserResponse';
  data?: Maybe<User>;
  error?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<ErrorsT>>;
  message?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addTest: AddTestResponse;
  authenticate: AuthenticateResponse;
};


export type MutationAddTestArgs = {
  description?: InputMaybe<Scalars['String']>;
  endDate: Scalars['String'];
  passMark: Scalars['String'];
  startDate: Scalars['String'];
  subject: Scalars['String'];
  title: Scalars['String'];
};


export type MutationAuthenticateArgs = {
  idToken: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getUser: GetUserResponse;
};

export type Question = {
  __typename?: 'Question';
  _id: Scalars['String'];
  answers?: Maybe<Array<Scalars['String']>>;
  choices?: Maybe<Array<Scalars['String']>>;
  description: Scalars['String'];
  owner: User;
  slug: Scalars['String'];
  status?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};

export type Test = {
  __typename?: 'Test';
  _id: Scalars['String'];
  attendants?: Maybe<Array<Scalars['String']>>;
  createdAt?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  endDate: Scalars['String'];
  managerId?: Maybe<User>;
  passMark: Scalars['String'];
  questions?: Maybe<Array<Question>>;
  startDate: Scalars['String'];
  status?: Maybe<Scalars['String']>;
  subject: Scalars['String'];
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  createdAt?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  names?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  profilePicture?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type AuthenticateMutationVariables = Exact<{
  idToken: Scalars['String'];
}>;


export type AuthenticateMutation = { __typename?: 'Mutation', authenticate: { __typename?: 'AuthenticateResponse', message: string } };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'GetUserResponse', error?: string | null, errors?: Array<{ __typename?: 'ErrorsT', field: string, message: string }> | null, data?: { __typename?: 'User', _id: string, username?: string | null, names?: string | null, email: string } | null } };

export type ErrorsFragment = { __typename?: 'ErrorsT', field: string, message: string };

export type UserFragment = { __typename?: 'User', _id: string, username?: string | null, names?: string | null, email: string };

export const ErrorsFragmentDoc = gql`
    fragment errors on ErrorsT {
  field
  message
}
    `;
export const UserFragmentDoc = gql`
    fragment user on User {
  _id
  username
  names
  email
}
    `;
export const AuthenticateDocument = gql`
    mutation Authenticate($idToken: String!) {
  authenticate(idToken: $idToken) {
    message
  }
}
    `;
export type AuthenticateMutationFn = Apollo.MutationFunction<AuthenticateMutation, AuthenticateMutationVariables>;

/**
 * __useAuthenticateMutation__
 *
 * To run a mutation, you first call `useAuthenticateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthenticateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authenticateMutation, { data, loading, error }] = useAuthenticateMutation({
 *   variables: {
 *      idToken: // value for 'idToken'
 *   },
 * });
 */
export function useAuthenticateMutation(baseOptions?: Apollo.MutationHookOptions<AuthenticateMutation, AuthenticateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthenticateMutation, AuthenticateMutationVariables>(AuthenticateDocument, options);
      }
export type AuthenticateMutationHookResult = ReturnType<typeof useAuthenticateMutation>;
export type AuthenticateMutationResult = Apollo.MutationResult<AuthenticateMutation>;
export type AuthenticateMutationOptions = Apollo.BaseMutationOptions<AuthenticateMutation, AuthenticateMutationVariables>;
export const GetUserDocument = gql`
    query GetUser {
  getUser {
    errors {
      ...errors
    }
    error
    data {
      ...user
    }
  }
}
    ${ErrorsFragmentDoc}
${UserFragmentDoc}`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;