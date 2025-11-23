import { buildSchema } from 'type-graphql';
import { EmployeeResolver } from './resolvers/EmployeeResolver';
import depthLimit from 'graphql-depth-limit';
import { prisma } from './types/context';

export const createSchema = () =>
  buildSchema({
    resolvers: [EmployeeResolver],
    authChecker: ({ context }: { context: any }, roles) => {
      if (!context.user) return false;
      if (roles.length === 0) return true;
      return roles.includes(context.user.role);
    },
    validate: false,
  });