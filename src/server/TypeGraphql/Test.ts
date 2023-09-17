import { Field, ObjectType, ClassType, ArgsType } from 'type-graphql';
import { Test } from '@/server/Models/TestModel';
import { ErrorsT } from './User';
import { IsNotEmpty, IsPositive, IsNumber } from 'class-validator';
import { Attendant } from '@/server/Models/AttendantModel';

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

    @Field({ nullable: true })
    nextPage?: number;
  }

  return CustomResponseClass;
}

@ObjectType()
export class AddTestResponse extends CustomResponse(Test) {}

@ArgsType()
export class AddTestArgs {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  @IsNotEmpty()
  subject: string;

  @Field()
  @IsNotEmpty()
  startDate: string;

  @Field()
  @IsNotEmpty()
  endDate: string;

  @Field()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsPositive()
  passMark: number;
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

@ArgsType()
export class VerifyTestUriArgs {
  @Field()
  @IsNotEmpty()
  test: string;

  @Field()
  @IsNotEmpty({ message: 'Attendant is required' })
  attendant: string;
}

@ObjectType()
export class VerifyTestUriResponse extends CustomResponse(Test) {
  @Field({ nullable: true, defaultValue: false })
  verified?: boolean;

  @Field(() => Attendant, { nullable: true })
  attendant?: Attendant;

  @Field(() => Test, { nullable: true })
  test?: Test;

  @Field({ nullable: true })
  numberOfQuestions?: number;
}

@ObjectType()
export class SendEmailResponse {
  @Field({ nullable: true })
  success?: boolean;
}
