import { prop, getModelForClass } from '@typegoose/typegoose';
import { UserRoleEnum } from '@/generated/User';

class UserModel {
  @prop()
  username?: string;

  @prop({ required: true, unique: true })
  email: string;

  @prop()
  password?: string;

  @prop({ enum: UserRoleEnum, default: UserRoleEnum.User })
  role?: string;

  @prop()
  profilePicture?: string;

  @prop()
  names?: string;

  @prop()
  slug?: string;

  @prop()
  createdAt: string;

  @prop()
  updatedAt: string;
}

const userModel = getModelForClass(UserModel, {
  schemaOptions: { timestamps: true },
});

export default userModel;
