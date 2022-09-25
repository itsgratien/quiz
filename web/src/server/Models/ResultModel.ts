import typegoose, {
  prop,
  DocumentType,
  getModelForClass,
} from '@typegoose/typegoose';
import { ObjectType, Field } from 'type-graphql';
import { Test } from './TestModel';
import { Attendant } from './AttendantModel';
import { Answer } from './AnswerModel';
import { ResultStatus } from '@/generated/Enum';

@ObjectType()
class AnsweredQuestions {
  @Field(() => Answer)
  @prop({ ref: () => Answer })
  answer: typegoose.Ref<Answer | string>;
}

@ObjectType()
export class Result {
  @Field()
  _id: string;

  @Field()
  @prop()
  overralgrade: string;

  @Field(() => Attendant || String)
  @prop({ ref: () => Attendant })
  attendant: typegoose.Ref<Attendant, string>;

  @Field(() => Test)
  @prop({ ref: () => Test })
  testId: typegoose.Ref<Test, string>;

  @Field(() => [AnsweredQuestions || String])
  @prop()
  answers: AnsweredQuestions[];

  @Field(() => String, { nullable: true })
  @prop({ required: false })
  status?: ResultStatus;

  @Field({ nullable: true })
  @prop({ required: false })
  video?: string;

  @Field({ nullable: true })
  createdAt?: string;

  @Field({ nullable: true })
  updatedAt?: string;
}

export const resultModel = getModelForClass(Result, {
  schemaOptions: { timestamps: true },
});

export type ResultDocument = DocumentType<Result>;
