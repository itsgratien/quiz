import { ObjectType, Field } from 'type-graphql';
import { prop, getModelForClass } from '@typegoose/typegoose';
import typegoose from '@typegoose/typegoose';
import { Question } from './QuestionModel';
import { Attendant } from './AttendantModel';
import { Test } from './TestModel';

@ObjectType()
export class Answer {
  @Field()
  _id: string;

  @Field(() => Question || String)
  @prop({ ref: () => Question })
  question: typegoose.Ref<Question | string>;

  @Field(() => Attendant || String)
  @prop({ ref: () => Attendant })
  attendant: typegoose.Ref<Attendant | string>;

  @Field(() => Test || String)
  @prop({ ref: () => Test })
  testId: typegoose.Ref<Test | string>;

  @Field(() => [String])
  @prop()
  answers: string[];

  @Field()
  @prop()
  grade: string;

  @Field({ nullable: true })
  @prop()
  video?: string;

  @Field({ nullable: true })
  createdAt?: string;

  @Field({ nullable: true })
  updatedAt?: string;
}

export const answerModel = getModelForClass(Answer, {
  schemaOptions: {
    timestamps: true,
  },
});
