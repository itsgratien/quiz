import { prop, getModelForClass, DocumentType } from '@typegoose/typegoose';
import { UserRole } from '@/generated/Enum';
import { ObjectType, Field } from 'type-graphql';
import mongoose from 'mongoose';

@ObjectType()
export class User {
  @Field(()=> String)
  _id: mongoose.Types.ObjectId | string;

  @Field({ nullable: true })
  @prop()
  username?: string;

  @Field()
  @prop({ required: true, unique: true })
  email: string;

  @Field({ nullable: true })
  @prop()
  password?: string;

  @Field({ defaultValue: UserRole.Manager })
  @prop({ enum: UserRole, default: UserRole.Manager })
  role?: string;

  @Field({ nullable: true })
  @prop()
  profilePicture?: string;

  @Field({ nullable: true })
  @prop()
  names?: string;

  @Field({ nullable: true })
  @prop()
  slug?: string;

  @Field(() => String, { nullable: true })
  @prop({ default: Date.now() })
  createdAt?: string;

  @Field(() => String, { nullable: true })
  @prop({ default: Date.now() })
  updatedAt?: string;
}

export const userModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
});

export type UserDocument = DocumentType<User>;

export default userModel;
