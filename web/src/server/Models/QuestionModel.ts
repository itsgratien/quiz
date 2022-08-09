import typegoose, {
  prop,
  getModelForClass,
  DocumentType,
} from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';
import { QuestionType, TestStatus } from '@/generated/Enum';
import { User } from './UserModel';

@ObjectType()
export class Question {
  @Field()
  _id: string;

  @Field(() => String)
  @prop()
  title: string;

  @Field(() => String, { defaultValue: QuestionType.MultipleChoice })
  @prop({ default: QuestionType.MultipleChoice, type: String })
  type: QuestionType;

  @Field(() => User || String, { nullable: true })
  @prop({ ref: () => User })
  owner?: typegoose.Ref<User, string>;

  @Field()
  @prop()
  slug: string;

  @Field(() => String, { defaultValue: TestStatus.Draft })
  @prop({ default: TestStatus.Draft, type: String })
  status: TestStatus;

  @Field({ nullable: true })
  @prop()
  description?: string;

  @Field(() => [String], { nullable: true })
  @prop({ type: [String] })
  choices?: string[];

  @Field(() => [String], { nullable: true })
  @prop({ type: [String] })
  answers?: string[];

  @Field({ nullable: true })
  createdAt?: string;

  @Field({ nullable: true })
  updatedAt?: string;
}

export const questionModel = getModelForClass(Question, {
  schemaOptions: { timestamps: true },
});
export type QuestionDocument = DocumentType<Question>;
