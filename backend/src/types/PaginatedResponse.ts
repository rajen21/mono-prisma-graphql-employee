import { ObjectType, Field, Int } from 'type-graphql';
import { Employee } from '../generated/prisma/client';

@ObjectType()
export class PaginatedEmployees {
  @Field(() => [Employee])
  items: Employee[];

  @Field(() => Int)
  total: number;

  @Field()
  hasMore: boolean;
}