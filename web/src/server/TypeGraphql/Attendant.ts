import { ObjectType, ArgsType, Field } from 'type-graphql';
import { Attendant } from '../Models/AttendantModel';
import { CustomResponse } from './Test';

@ArgsType()
export class AddAttendantArgs {
  @Field()
  email: string;

  @Field()
  names: string;

  @Field()
  phoneNumber: string;

  @Field()
  testId: string;
}

@ObjectType()
export class AddAttendantResponse extends CustomResponse(Attendant) {}
