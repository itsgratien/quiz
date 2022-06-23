import { Resolver, Query, ObjectType, Field } from 'type-graphql';
import { db } from '@/utils/Mongo';
import { Document } from 'mongodb';

@ObjectType()
class User {
  @Field()
  names: string;

  @Field()
  email: string;
}

interface IUser extends Document {
  names: string;
  email: string;
}

@Resolver()
export class UserResolver {
  @Query(() => User)
  async getUser(): Promise<User | null> {
    const collection = db.collection<IUser>('users');

    const find = await collection.findOne({
      email: 'gracian2020@gmail.com',
    });

    console.log('find', find);

    return find || null;
  }
}
