import { ObjectType, Field } from 'type-graphql';
import type { NextApiRequest, NextApiResponse } from 'next';

export enum UserRoleEnum {
  SuperAdmin = 'SuperAdmin',
  Admin = 'Admin',
  Manager = 'Manager',
  User = 'User',
}

@ObjectType()
export class UserT {
  @Field()
  _id: string;

  @Field({ nullable: true })
  names?: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  role?: string;

  @Field({ nullable: true })
  profilePicture?: string;

  @Field({ nullable: true })
  createdAt?: string;

  @Field({ nullable: true })
  updatedAt?: string;

  @Field({ nullable: true })
  slug?: string;
}

export interface RequestT extends NextApiRequest {
  user?: any;
}
export interface ContextT {
  req: RequestT;
  res: NextApiResponse;
}
