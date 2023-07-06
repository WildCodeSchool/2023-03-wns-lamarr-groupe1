import { ContextFunction } from "apollo-server-core";
import { JwtPayload, verify } from "jsonwebtoken";
import { UsersModels } from "../models/UsersModels";

export const apolloContext: ContextFunction = async ({ req }) => {
  if (req.headers.authorization === null) {
    return {};
  }

  // "authorization": `Bearer ${token}`
  try {
    const bearer = req.headers.authorization?.split("Bearer ")[1];
    if (bearer?.length === 0) {
      return {};
    }

    const decodedPayload = verify(
      bearer,
      process.env.ACCESS_TOKEN_SECRET ?? 'test-secret'
    );
    if (typeof (decodedPayload as unknown as JwtPayload)?.userId === "number") {
      const user = await UsersModels.findOne({
        where: { id: (decodedPayload as unknown as JwtPayload).userId },
      });
      return { user };
    }
    return {};
  } catch (error) {
    // console.log("error", error);
    return {};
  }
};