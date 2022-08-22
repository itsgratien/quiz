import { ObjectType, Field, ArgsType } from 'type-graphql';
import { IsNotEmpty, IsArray } from 'class-validator';
import { CustomResponse } from './Test';
import { Answer } from '@/server/Models/AnswerModel';

@ObjectType()
export class AnswerResponse extends CustomResponse(Answer) {}

@ArgsType()
export class AnswerMcArgs {
  @Field()
  @IsNotEmpty()
  question: string;

  @Field()
  @IsNotEmpty()
  test: string;

  @Field()
  @IsNotEmpty()
  attendant: string;

  @Field(() => [String])
  @IsArray()
  answers: string[];
}
