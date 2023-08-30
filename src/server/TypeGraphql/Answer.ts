import { ObjectType, Field, ArgsType } from 'type-graphql';
import { IsNotEmpty, IsArray } from 'class-validator';
import { CustomResponse } from './Test';
import { Answer } from '@/server/Models/AnswerModel';
import { VerifyTestUriArgs } from './Test';

@ObjectType()
export class AnswerResponse extends CustomResponse(Answer) {}

@ArgsType()
export class AnswerMcArgs extends VerifyTestUriArgs {
  @Field()
  @IsNotEmpty()
  question: string;

  @Field(() => [String])
  @IsArray()
  answers: string[];
}

@ArgsType()
export class GetAnswerArgs extends VerifyTestUriArgs {
  @Field()
  @IsNotEmpty()
  question: string;
}

@ObjectType()
export class GetAnswerResponse extends CustomResponse(Answer) {}

@ObjectType()
export class GetAnswersResponse extends CustomResponse(Answer) {
  @Field(() => [Answer])
  items?: Answer[];
}
