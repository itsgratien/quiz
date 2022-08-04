import { ObjectType, Field } from 'type-graphql';
import mongoose from 'mongoose';
import * as typegoose from '@typegoose/typegoose';
import { User } from './UserModel';
import { prop } from '@typegoose/typegoose';
import { TestStatus } from '@/generated/Enum';

@ObjectType()
export class Test {
  @Field()
  _id: string | mongoose.Types.ObjectId;

  @Field()
  @typegoose.prop()
  title: string;

  @Field()
  @typegoose.prop({ ref: () => User })
  managerId: typegoose.Ref<User, string>;

  @Field()
  @prop({ default: TestStatus.Draft, type: String })
  status?: TestStatus;

  @Field()
  @prop()
  passMark: number;

  @Field()
  @prop()
  subject: string;

  @Field({ nullable: true })
  @prop()
  description?: string;

  @Field()
  @prop()
  startDate: string;

  @Field()
  @prop()
  endDate: string;

  @Field({ nullable: true })
  @prop()
  questions?: any;

  @Field({ nullable: true })
  @prop()
  attendants?: any;

  @Field({ nullable: true })
  createdAt: string;

  @Field({ nullable: true })
  updatedAt: string;
}

export const testModel = typegoose.getModelForClass(Test, {
  schemaOptions: { timestamps: true },
});
