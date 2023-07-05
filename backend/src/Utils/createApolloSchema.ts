import { buildSchema } from "type-graphql"
import { AuthResolver } from "../resolvers/AuthResolver"
import { FileResolver } from "../resolvers/FilesResolver"

export const createApolloSchema = async (): Promise<any> =>
  await buildSchema({
    resolvers: [AuthResolver, FileResolver],
    authChecker: ({ context }) => {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      return !!context.user
    }
  })
