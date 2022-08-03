import type { NextApiRequest, NextApiResponse } from 'next';
import { gql } from '@apollo/client';
import { Session, SessionRecord } from 'next-session/lib/types';

export enum UserRoleEnum {
  SuperAdmin = 'SuperAdmin',
  Admin = 'Admin',
  Manager = 'Manager',
  User = 'User',
}


export interface ContextT {
  req: NextApiRequest & {
    session?: any
  };
  res: NextApiResponse;
}

export const GET_USER_QUERY = gql`
  query GetUser {
    getUser {
      email
      names
    }
  }
`;

export interface GetUserT {
  getUser: {
    email: string;
    names: string | null;
  };
}

export interface LoginPropsT {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (values: LoginParamT) => void;
  error?: string;
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

export class AuthenticateResponseT {
  authenticate: {
    message: string;
  };
}

export interface LoginParamT {
  email: string;
  password: string;
}
