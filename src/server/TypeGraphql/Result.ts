import { ArgsType, ObjectType, Field } from 'type-graphql';
import { Result } from '@/server/Models/ResultModel';
import { CustomResponse } from './Test';

@ObjectType()
export class GetOverralGradeResponse extends CustomResponse(Result) {
  @Field({ nullable: true })
  overralgrade?: string;
}

@ArgsType()
export class GetOverralGradeArgs {
  @Field()
  test: string;

  @Field()
  attendant: string;
}
