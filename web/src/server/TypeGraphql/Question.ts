import { Field, ArgsType, ObjectType } from 'type-graphql';
import { CustomResponse } from './Test';
import { Question } from '@/server/Models/QuestionModel';

@ObjectType()
export class AddQuestionResponse extends CustomResponse(Question) {}

@ArgsType()
export class AddMcQuestionArgs {
  @Field()
  title: string;

  @Field(() => [String])
  choices: string[];

  @Field(() => [String])
  answers: string[];

  @Field()
  description: string;
}

@ObjectType()
class GetQuestionsResponseItem{
  @Field(()=> [Question])
  items: Question[];

  @Field()
  totalDocs: number;

}

@ObjectType()
export class GetQuestionsResponse extends CustomResponse(GetQuestionsResponseItem) {}

@ArgsType()
export class GetQuestionsArgs {
  @Field()
  limit: number;

  @Field()
  page: number;
}
