import { Field, ID, Int, ObjectType, InputType, ArgsType, registerEnumType } from 'type-graphql';
import { IsEmail, MinLength, IsString, IsInt, Min, Max, IsOptional, IsArray, Length } from 'class-validator';

// Enums
export enum Role {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}

registerEnumType(Role, { name: 'Role' });

// User Response
@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  name: string;

  @Field(() => Role)
  role: Role;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

// Auth Payload
@ObjectType()
export class AuthPayload {
  @Field()
  token: string;

  @Field(() => User)
  user: User;
}

// Smart Signup Input (Conditional Employee Fields)
@InputType()
export class SignupInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(6)
  password: string;

  @Field()
  @IsString()
  @Length(2, 50)
  name: string;

  @Field(() => Role)
  role: Role;

  // EMPLOYEE-ONLY FIELDS (will be validated in resolver)
  @Field({ nullable: true })
  @IsOptional()
  @IsInt()
  @Min(18)
  @Max(65)
  age?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(1, 20)
  className?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  subjects?: string[];
}

// Login Input
@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(6)
  password: string;
}

// Employee Types
@ObjectType()
export class Employee {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Int)
  age: number;

  @Field()
  class: string;

  @Field(() => [String])
  subjects: string[];

  @Field(() => Int)
  attendance: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateEmployeeInput {
  @Field()
  @IsString()
  @Length(2, 100)
  name: string;

  @Field(() => Int)
  @IsInt()
  @Min(18)
  @Max(65)
  age: number;

  @Field()
  @IsString()
  @Length(1, 20)
  class: string;

  @Field(() => [String])
  @IsArray()
  subjects: string[];
}

// Pagination & Filter Args
@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { defaultValue: 0 })
  @IsInt()
  skip: number = 0;

  @Field(() => Int, { defaultValue: 10 })
  @IsInt()
  @Min(1)
  @Max(50)
  take: number = 10;
}

@ArgsType()
export class EmployeeFilterArgs {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  search?: string; // Search name

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  class?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  minAge?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  maxAge?: number;
}

@ArgsType()
export class SortArgs {
  @Field({ nullable: true, defaultValue: 'createdAt' })
  @IsOptional()
  sortBy?: 'name' | 'age' | 'class' | 'attendance' | 'createdAt';

  @Field({ nullable: true, defaultValue: 'desc' })
  @IsOptional()
  order?: 'asc' | 'desc';
}

// Response Types
@ObjectType()
export class EmployeeConnection {
  @Field(() => [Employee])
  employees: Employee[];

  @Field()
  totalCount: number;

  @Field()
  hasNextPage: boolean;
}