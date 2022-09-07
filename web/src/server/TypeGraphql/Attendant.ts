import { ObjectType, ArgsType, Field, InputType } from 'type-graphql';
import { Attendant } from '../Models/AttendantModel';
import { CustomResponse } from './Test';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { PaginationArgs } from './Question';

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
  completedDocs?: number;

  @Field({ nullable: true })
  startedDocs?: number;

  @Field({ nullable: true })
  inProgressDocs?: number;
}
