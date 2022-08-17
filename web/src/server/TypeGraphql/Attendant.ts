import { ObjectType, ArgsType, Field, UseMiddleware } from 'type-graphql';
import { Attendant } from '../Models/AttendantModel';
import { CustomResponse } from './Test';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { verifyTest } from '@/server/Middlewares/AttendantMiddleware';

@ArgsType()
@ObjectType()
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

  @Field()
  @IsNotEmpty()
  @UseMiddleware(verifyTest)
  testId: string;
}

@ObjectType()
export class AddAttendantResponse extends CustomResponse(Attendant) {}
