import { testModel } from '@/server/Models/TestModel';
import { Resolver, Args, Ctx } from 'type-graphql';
import {} from '@/server/TypeGraphql/User';

@Resolver()
export class TestResolver{
    async addTest(){}
}