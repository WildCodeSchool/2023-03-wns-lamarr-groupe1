import { registerEnumType } from "type-graphql";

export enum InteractionType {
    Like = "like",
    Dislike = "dislike",
  }
  
  registerEnumType(InteractionType, {
    name: "InteractionType",
  });