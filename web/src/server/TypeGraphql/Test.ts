import { Field, ObjectType, ClassType, ArgsType } from 'type-graphql';
import { Test } from '@/server/Models/TestModel';
import { ErrorsT } from './User';
import { IsNotEmpty } from 'class-validator';

export function CustomResponse<Data>(DataClass: ClassType<Data>) {
  @ObjectType({ isAbstract: true })
  abstract class CustomResponseClass {
    @Field(() => [ErrorsT], { nullable: true })
    errors?: ErrorsT[];

    @Field(() => DataClass, { nullable: true })
    data?: Data;

    @Field({ nullable: true })
    error?: string;

    @Field({ nullable: true })
    message?: string;

    @Field({ nullable: true })
    status?: number;

    @Field({ nullable: true })
    totalDocs?: number;

    @Field({ nullable: true })
    totalPages?: number;
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
  startDate: string;

  @Field()
  endDate: string;
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
export class GetMyTestResponse extends CustomResponse(Test) {
  @Field(() => [Test], { nullable: true })
  items?: Test[];
}

@ObjectType()
export class GetSingleTestResponse extends CustomResponse(Test) {}
