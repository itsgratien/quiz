import typegoose, {
  prop,
  getModelForClass,
  DocumentType,
} from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';
import { QuestionType, TestStatus } from '@/generated/Enum';
import { User } from './UserModel';
import { DateCreation } from '@/server/TypeGraphql/Test';

@ObjectType()
export class Question {
  @Field()
  _id: string;

  @Field()
  @prop()
  title: string;

  @Field(() => String, { defaultValue: QuestionType.MultipleChoice })
  @prop({ default: QuestionType.MultipleChoice, type: String })
  type: QuestionType;

  @Field(() => User || String)
  @prop({ ref: () => User })
  owner: typegoose.Ref<User, string>;

  @Field()
  @prop()
  slug: string;

  @Field(() => String, { defaultValue: TestStatus.Draft })
  @prop({ default: TestStatus.Draft, type: String })
  status: TestStatus;

  @Field()
  @prop()
  description: string;

  @Field(() => [String], { nullable: true })
  @prop({ type: [String] })
  choices?: string[];

  @Field(() => [String], { nullable: true })
  @prop({ type: [String] })
  answers: string[];
}

export const questionModel = getModelForClass(Question, {
  schemaOptions: { timestamps: true },
});
export type QuestionDocument = DocumentType<Question>;
