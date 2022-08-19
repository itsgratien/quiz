import { ObjectType, Field } from 'type-graphql';
import { User } from './UserModel';
import typegoose, {
  prop,
  getModelForClass,
  DocumentType,
} from '@typegoose/typegoose';
import { TestStatus } from '@/generated/Enum';
import { Question } from './QuestionModel';
import { Attendant } from './AttendantModel';

@ObjectType()
export class Test {
  @Field()
  _id: string;

  @Field()
  @prop({ type: String })
  title: string;

  @Field(() => User || String, { nullable: true })
  @prop({ ref: () => User })
  managerId?: typegoose.Ref<User, string>;

  @Field(() => String, { defaultValue: TestStatus.Draft })
  @prop({ default: TestStatus.Draft, type: String })
  status?: TestStatus;

  @Field()
  @prop({ type: String, required: true })
  passMark: string;

  @Field()
  @prop({ type: String, required: true })
  subject: string;

  @Field({ nullable: true })
  @prop()
  description?: string;

  @Field()
  @prop({ type: String })
  startDate: string;

  @Field()
  @prop()
  endDate: string;

  @Field(() => [Question || String], { nullable: true })
  @prop({ required: false, ref: () => Question })
  questions?: string[] | typegoose.Ref<Question[], any>;

  @Field(() => [Attendant || String], { nullable: true })
  @prop({ required: false, ref: () => Attendant })
  attendants?: string[] | typegoose.Ref<Attendant[]>;

  @Field({ nullable: true })
  @prop()
  createdAt?: string;

  @Field({ nullable: true })
  @prop()
  updatedAt?: string;
}

export const testModel = getModelForClass(Test, {
  schemaOptions: { timestamps: true },
});

export type TestDocument = DocumentType<Test>;
