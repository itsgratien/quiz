import React from 'react';
import { ObjectType, Field, ArgsType } from 'type-graphql';
import { gql } from '@apollo/client';

export interface TLoginProps {
  open: boolean;
  handleClose: () => void;
}

export interface InputPropsT {
  placeholder?: string;
  type: 'text' | 'password' | 'email' | 'number';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  name?: string;
  error?: string;
  marginTop?: string;
  inputheight?: number;
}

export interface SelectInputMenuT {
  value: string;
  name: string;
}
export interface SelectInputPropsT {
  label: string;
  name: string;
  error?: string;
  onChange: (e: any) => void;
  placeholder?: string;
  value: string;
  items: SelectInputMenuT[];
}

export interface AuthErrorPropsT {
  error: string;
}

export interface AuthContextT {
  isAuth?: boolean;
}

export interface IsAuthPropsT<T> {
  WrappedComponent: React.ComponentClass<T>;
}

export interface AuthProviderPropsT {
  children: React.ReactNode;
}

@ArgsType()
export class AuthenticateT {
  @Field()
  idToken: string;
}

@ObjectType()
export class AuthenticateResponseT {
  @Field()
  message: string;
}

export const AUTHENTICATE_MUTATION = gql`
  mutation Authenticate($idToken: String!) {
    authenticate(idToken: $idToken) {
      message
    }
  }
`;

export interface AuthenticateVariableT {
  idToken: string;
}

export class AuthenticateResponseUT {
  authenticate: {
    message: string;
  };
}
