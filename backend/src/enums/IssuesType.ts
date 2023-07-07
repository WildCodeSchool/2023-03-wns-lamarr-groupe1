import { registerEnumType } from "type-graphql";

export enum IssuesType {
  Open = "open",
  Pending = "pending",
  Close = "close",
}

registerEnumType(IssuesType, {
  name: "IssuesType",
});
