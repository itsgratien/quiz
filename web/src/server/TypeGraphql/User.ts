import { ObjectType, Field, ArgsType } from 'type-graphql';
import { User } from '@/server/Models/UserModel';

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

@ObjectType()
export class ErrorsT {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
export class GetUserResponseT {
  @Field((type) => [ErrorsT], { nullable: true })
  errors?: ErrorsT[];

  @Field({ nullable: true })
  user?: User;

  @Field({ nullable: true })
  error?: string;
}
