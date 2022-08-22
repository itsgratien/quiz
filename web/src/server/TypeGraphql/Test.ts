import { Field, ObjectType, ClassType, ArgsType } from 'type-graphql';
import { Test } from '@/server/Models/TestModel';
import { ErrorsT } from './User';
import { IsNotEmpty } from 'class-validator';
import { GetPaginationResponse } from './Question';

export function CustomResponse<Data>(DataClass: ClassType<Data>) {
  @ObjectType({ isAbstract: true })
  abstract class CustomResponseClass extends GetPaginationResponse {
    @Field(() => [ErrorsT], { nullable: true })
    errors?: ErrorsT[];

    @Field(() => DataClass || [DataClass], { nullable: true })
    data?: Data | Data[];

    @Field({ nullable: true })
    error?: string;

    @Field({ nullable: true })
    message?: string;

    @Field({ nullable: true })
    status?: number;
  }

  return CustomResponseClass;
}

@ObjectType()
export class AddTestResponse extends CustomResponse(Test) {}

@ArgsType()
export class AddTestArgs {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  subject: string;

  @Field()
  passMark: string;

  @Field()
  startDate: string;

  @Field()
  endDate: string;
}

@ObjectType()
export class DateCreation {
  @Field({ nullable: true })
  createdAt?: string;

  @Field({ nullable: true })
  updatedAt?: string;
}

@ArgsType()
export class PublishTestArgs {
  @Field()
  @IsNotEmpty()
  testId: string;
}

@ArgsType()
export class GetMyTestArgs {
  @Field()
  limit?: number;

  @Field()
  page: number;
}

@ObjectType()
class MyTestResponse extends GetPaginationResponse {
  @Field(() => [Test])
  items: Test[];
}
@ObjectType()
export class GetMyTestResponse extends CustomResponse(MyTestResponse) {}
