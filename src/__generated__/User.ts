import type { NextApiRequest, NextApiResponse } from 'next';

export interface ContextT {
  req: NextApiRequest & {
    session?: any;
  };
  res: NextApiResponse;
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

export interface LoginParamT {
  email: string;
  password: string;
}
