import {
  Resolver,
  Query,
  Args,
  Authorized,
  Ctx,
  Arg,
} from 'type-graphql';
// import { PrismaClient } from '@prisma/client';
import { Prisma } from "@prisma/client"
import prisma from '../services/prisma';
import {
  Employee,
  EmployeeFilterArgs,
  PaginationArgs,
  SortArgs,
  EmployeeConnection 
} from '../types/schemaType';
import { Context } from '../types/context';


@Resolver(Employee)
export class EmployeeResolver {
  @Query(() => EmployeeConnection)
  @Authorized()
  async employees(
    @Args() { skip, take }: PaginationArgs,
    @Args() filters: EmployeeFilterArgs,
    @Args() { sortBy, order }: SortArgs,
    @Ctx() { req }: Context
  ) {
    const where: Prisma.EmployeeWhereInput = {};

    // Search by name
    if (filters.search) {
      where.name = {
        contains: filters.search,
        mode: 'insensitive',
      };
    }

    // Filter by class
    if (filters.class) {
      where.class = filters.class;
    }

    // Filter by age range
    if (filters.minAge || filters.maxAge) {
      where.age = {};
      if (filters.minAge) where.age.gte = filters.minAge;
      if (filters.maxAge) where.age.lte = filters.maxAge;
    }

    // Sorting
    const orderBy: Prisma.EmployeeOrderByWithRelationInput[] = [
      { [sortBy!]: order },
    ];

    // Get total count
    const totalCount = await prisma.employee.count({ where });

    // Get paginated results
    const employees = await prisma.employee.findMany({
      where,
      skip,
      take,
      orderBy,
    });

    return {
      employees,
      totalCount,
      hasNextPage: skip + take < totalCount,
    };
  }

  @Query(() => Employee, { nullable: true })
  @Authorized()
  async employee(
    @Arg('id') id: string,
    @Ctx() { req }: Context
  ) {

    const employee = await prisma.employee.findUnique({
      where: { id },
    });

    if (!employee) {
      throw new Error('Employee not found');
    }

    return employee;
  }
}