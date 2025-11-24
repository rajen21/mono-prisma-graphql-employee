import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
class Employee {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  position: string;
}

@ObjectType()
export class PaginatedEmployees {
  @Field(() => [Employee])
  items: Employee[];

  @Field(() => Int)
  total: number;

  @Field()
  hasMore: boolean;
}