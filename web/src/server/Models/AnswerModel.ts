import typegoose, {
  prop,
  DocumentType,
  getModelForClass,
} from '@typegoose/typegoose';
import { ObjectType, Field } from 'type-graphql';
import { Test } from './TestModel';
import { DateCreation } from '@/server/TypeGraphql/Test';
import { Attendant } from './AttendantModel';
import { Question } from './QuestionModel';

@ObjectType()
class AnswerQuestion {
  @Field()
  _id: string;

  @Field(() => [Question || String])
  @prop({ ref: () => Question })
  questionId: typegoose.Ref<Question | string>;

  @Field(() => [String])
  @prop()
  answers: string[];

  @Field()
  @prop()
  marks: string;
}

@ObjectType()
export class Answer {
  @Field()
  _id: string;

  @Field()
  @prop()
  overralgrade: string;

  @Field(() => Attendant || String, { nullable: false })
  @prop({ ref: () => Attendant })
  attendant?: typegoose.Ref<Attendant, string>;

  @Field(() => Test)
  @prop({ ref: () => Test })
  testId: typegoose.Ref<Test, string>;

  @Field(() => [AnswerQuestion || String])
  @prop()
  questions: AnswerQuestion[];

  @Field()
  @prop()
  video: string;
}

export const answerModel = getModelForClass(Answer, {
  schemaOptions: { timestamps: true },
});
export type AnswerDocument = DocumentType<Answer>;
