import typegoose, {
  prop,
  DocumentType,
  getModelForClass,
} from '@typegoose/typegoose';
import { ObjectType, Field } from 'type-graphql';
import { Test } from './TestModel';
import { AttendantStatus } from '@/generated/Enum';

@ObjectType()
export class Attendant {
  @Field()
  _id: string;

  @Field()
  @prop()
  names: string;

  @Field()
  @prop()
  email: string;

  @Field()
  @prop()
  phoneNumber: string;

  @Field()
  @prop()
  testUri: string;

  @Field(() => Test)
  @prop({ ref: () => Test })
  testId: typegoose.Ref<Test, string>;

  @Field()
  @prop()
  status: AttendantStatus;
}

export const attendantModel = getModelForClass(Attendant, {
  schemaOptions: { timestamps: true },
});
export type AttendantDocument = DocumentType<Attendant>;
