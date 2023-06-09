import { buildSchema } from "type-graphql";
import { AuthResolver } from "../resolvers/AuthResolver";

export const createApolloSchema = async(): Promise<any> =>
  await buildSchema({
    resolvers: [AuthResolver],
    authChecker: ({ context }) => {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      return !!context.user;
    },
  });