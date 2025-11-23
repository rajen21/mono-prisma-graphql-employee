import { buildSchema } from 'type-graphql';
import { AuthResolver } from '../resolvers/AuthResolver';
import { EmployeeResolver } from '../resolvers/EmployeeResolver';

export const createSchema = () =>
  buildSchema({
    resolvers: [AuthResolver, EmployeeResolver],
    authChecker: ({ context }) => {
      // Check if user is authenticated
      return !!context.req.user;
    },
    validate: { 
      always: true,
      skipMissingProperties: false,
    },
  });