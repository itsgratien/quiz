import { Field, ArgsType, ObjectType } from 'type-graphql';
import { CustomResponse } from './Test';
import { Question } from '@/server/Models/QuestionModel';
import { IsNotEmpty, IsEnum, IsArray } from 'class-validator';
import { TestStatus } from '@/generated/Enum';

@ObjectType()
export class AddQuestionResponse extends CustomResponse(Question) {}

@ArgsType()
export class AddMcQuestionArgs {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field(() => [String])
  @IsArray()
  choices: string[];

  @Field(() => [String])
  @IsArray()
  answers: string[];

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  testId?: string;

  @Field({ nullable: true })
  assignToTest?: boolean;
}

@ObjectType()
export class GetPaginationResponse {
  @Field({ nullable: true })
  totalDocs?: number;

  @Field({ nullable: true })
  totalPages?: number;
}

@ObjectType()
class GetQuestionsResponseItem extends GetPaginationResponse {
  @Field(() => [Question])
  items: Question[];
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

@ArgsType()
export class EditQuestionStatusArgs {
  @Field()
  id: string;

  @Field()
  @IsNotEmpty()
  @IsEnum(TestStatus)
  status: string;
}
