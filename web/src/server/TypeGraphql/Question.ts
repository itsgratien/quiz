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
class GetQuestionsResponseItem {
  @Field(() => [Question])
  items: Question[];

  @Field()
  totalDocs: number;

  @Field()
  totalPages: number;
}

@ObjectType()
export class GetQuestionsResponse extends CustomResponse(
  GetQuestionsResponseItem
) {}

@ObjectType()
@ArgsType()
export class PaginationArgs {
  @Field({ nullable: true })
  limit?: number;

  @Field()
  page: number;
}

@ArgsType()
export class GetQuestionsArgs extends PaginationArgs {}

@ArgsType()
export class GetQuestionArgs {
  @Field()
  id: string;
}

@ObjectType()
export class GetQuestionResponse extends CustomResponse(Question) {}

@ArgsType()
export class EditMcQArgs extends AddMcQuestionArgs {
  @Field()
  id: string;
}
