import { ObjectType, ArgsType, Field } from 'type-graphql';

@ArgsType()
export class AddAttendantArgs {
  @Field()
  email: string;

  @Field()
  names: string;

  @Field()
  phoneNumber: string;
}
