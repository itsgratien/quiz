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

  @Field({ nullable: true })
  @prop({ type: String, unique: true, required: false })
  testUri?: string;

  @Field(() => Test)
  @prop({ ref: () => Test })
  testId: typegoose.Ref<Test, string>;

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
}

export const attendantModel = getModelForClass(Attendant, {
  schemaOptions: { timestamps: true },
});
export type AttendantDocument = DocumentType<Attendant>;
