import { ObjectType, Field, ArgsType } from 'type-graphql';
import { User } from '@/server/Models/UserModel';
import { CustomResponse } from './Test';

@ArgsType()
export class Authenticate {
  @Field()
  idToken: string;
}

@ObjectType()
export class AuthenticateResponse {
  @Field()
  message: string;
}

@ObjectType()
export class ErrorsT {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
export class GetUserResponse extends CustomResponse(User) {}
