import { ObjectType, ArgsType, Field, InputType } from 'type-graphql';
import { Attendant } from '../Models/AttendantModel';
import { CustomResponse } from './Test';
import { IsNotEmpty, IsEmail } from 'class-validator';

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
