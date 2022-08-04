import { Field, ObjectType, ClassType } from 'type-graphql';
import { Test } from '@/server/Models/TestModel';
import { ErrorsT } from './User';

export function CustomResponse<Data>(DataClass: ClassType<Data>) {
  @ObjectType({ isAbstract: true })
  abstract class CustomResponseClass {
    @Field(() => [ErrorsT], { nullable: true })
    errors?: ErrorsT[];

    @Field(() => DataClass, { nullable: true })
    data?: Data;

    @Field({ nullable: true })
    error?: string;
  }

  return CustomResponseClass;
}
// @ObjectType()
// export class AddTestResponse extends CustomResponse(Test) {}
