import { ObjectType, ArgsType, Field, InputType } from 'type-graphql';
import { Attendant } from '../Models/AttendantModel';
import { CustomResponse, VerifyTestUriArgs } from './Test';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { PaginationArgs } from './Question';
import { AttendantStatus } from '@/generated/Enum';

@InputType()
export class AddAttendantArgs {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  names: string;

  @Field()
  @IsNotEmpty()
  phoneNumber: string;
}

@ObjectType()
export class AddAttendantResponse extends CustomResponse(Attendant) {}

@ObjectType()
export class AddMoreAttendantResponse extends CustomResponse(Attendant) {
  @Field(() => [Attendant], { nullable: true })
  items?: Attendant[];
}

@ArgsType()
export class GetAttendantByTestArgs extends PaginationArgs {
  @Field()
  testId: string;
}

@ObjectType()
export class GetAttendantByTestResponse extends CustomResponse(Attendant) {
  @Field(() => [Attendant])
  items?: Attendant[];

  @Field({ nullable: true })
  completedDoc?: number;

  @Field({ nullable: true })
  startedDoc?: number;

  @Field({ nullable: true })
  inProgressDoc?: number;
}

@ObjectType()
export class WhoIsDoingQuizResponse extends CustomResponse(Attendant) {
  @Field(() => Attendant)
  attendant?: Attendant;
}

@ArgsType()
export class WhoIsDoingQuizArgs extends VerifyTestUriArgs {}

@ArgsType()
export class ChangeStatusArgs extends VerifyTestUriArgs {
  @Field()
  status?: string;
}

@ArgsType()
export class UpdateAttendImageArgs {
  @Field({ nullable: false })
  attendantId: string;

  @Field({ nullable: false })
  image: string;
}
