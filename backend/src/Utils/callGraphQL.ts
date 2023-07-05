import { ApolloServer } from "apollo-server";
import { createApolloSchema } from "../Utils/createApolloSchema";
import { GraphQLRequest, GraphQLResponse } from "apollo-server-core";

export async function callGraphQL(
  request: Omit<GraphQLRequest, "query"> & {
    query?: string;
  }
): Promise<GraphQLResponse> {
  const schema = await createApolloSchema();
  const testServer = new ApolloServer({ schema });

  return await testServer.executeOperation(request);
}
