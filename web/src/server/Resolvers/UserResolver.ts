import { Resolver, Query, Mutation, ObjectType, Field } from 'type-graphql';

@ObjectType()
class User {
  @Field()
  names: string;

  @Field()
  email: string;
}

@Resolver()
export class UserResolver {
  @Query(() => User)
  getUser(): User {
    return {
      names: 'gratien',
      email: 'gracian10@gmail.com',
    };
  }
}
