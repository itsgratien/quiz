import { ObjectType, Field, ArgsType } from 'type-graphql';

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
