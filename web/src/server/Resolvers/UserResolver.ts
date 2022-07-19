import { Resolver, Query, ObjectType, Field } from 'type-graphql';
import userModel from '@/server/Models/UserModel';

@ObjectType()
class User {
  @Field()
  names?: string;

  @Field()
  email: string;
}
@Resolver()
export class UserResolver {
  @Query(() => User)
  async getUser(): Promise<User | null> {
    const find = await userModel.findOne({
      email: 'gracian2020@gmail.com',
    });

    if (find) {
      return {
        names: find.names,
        email: find.email,
      };
    }
    return null;
  }
}
