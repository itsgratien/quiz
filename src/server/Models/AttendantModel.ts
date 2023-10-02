import typegoose, {
  prop,
  DocumentType,
  getModelForClass,
} from '@typegoose/typegoose';
import { ObjectType, Field } from 'type-graphql';
import { Test } from './TestModel';
import { AttendantStatus } from '@/generated/Enum';

@ObjectType()
export class AttendantRefTest {
  @Field()
  _id: string;

  @Field()
  title: string;

  @Field()
  status: string;
}

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

  @Field({ nullable: true })
  @prop({ type: String, required: false })
  testUri?: string;

  @Field(() => String || Test, { nullable: true })
  @prop({ ref: () => 'Test', required: false })
  testId?: typegoose.Ref<Test, string>;

  @Field(() => String, { nullable: true })
  @prop({ required: false })
  image?: string;

  @Field(() => String, {
    nullable: true,
    defaultValue: AttendantStatus.Started,
  })
  @prop({ type: String, default: AttendantStatus.Started })
  status?: AttendantStatus;

  @Field({ nullable: true })
  createdAt?: string;

  @Field({ nullable: true })
  updatedAt?: string;

  @Field(() => AttendantRefTest, { nullable: true })
  test?: AttendantRefTest;
}

export const attendantModel = getModelForClass(Attendant, {
  schemaOptions: { timestamps: true },
});
export type AttendantDocument = DocumentType<Attendant>;
