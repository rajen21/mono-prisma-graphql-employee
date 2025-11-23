import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { hashPassword, comparePassword } from '../utils/passowrd';
import { 
  AuthPayload, 
  SignupInput, 
  LoginInput, 
  Role,
  CreateEmployeeInput 
} from '../types/schemaType';
import { Context } from '../types/context';
import logger from '../utils/logger';


@Resolver()
export class AuthResolver {
  @Mutation(() => AuthPayload)
  async signup(
    @Arg('data') data: SignupInput,
    @Ctx() { prisma }: Context
  ) {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await hashPassword(data.password);

    let user;
    
    if (data.role === Role.EMPLOYEE) {
      // EMPLOYEE: Create user + employee record
      if (!data.age || !data.className || !data.subjects) {
        throw new Error('Employee role requires: age, className, and subjects');
      }

      const employeeData: CreateEmployeeInput = {
        name: data.name,
        age: data.age!,
        class: data.className!,
        subjects: data.subjects!,
      };

      user = await prisma.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          name: data.name,
          role: Role.EMPLOYEE,
        },
      });

      // Create employee record
      await prisma.employee.create({
        data: employeeData,
      });

    } else {
      // ADMIN: Just create user
      user = await prisma.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          name: data.name,
          role: Role.ADMIN,
        },
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id }, 
      process.env.JWT_SECRET!, 
      { expiresIn: '7d' }
    );

    logger.info(`New user signed up: ${data.email} (${data.role})`);
    
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }

  @Mutation(() => AuthPayload)
  async login(
    @Arg('data') { email, password }: LoginInput,
    @Ctx() { prisma }: Context
  ) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await comparePassword(password, user.password))) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign(
      { userId: user.id }, 
      process.env.JWT_SECRET!, 
      { expiresIn: '7d' }
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }
}