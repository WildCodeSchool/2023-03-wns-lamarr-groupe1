import {
    Length,
    IsEnum,
  } from "class-validator";
import { Field, InputType } from "type-graphql";

  
enum InteractionType {
  Like = "like",
  Dislike = "dislike",
}

  @InputType()
  export class InteractionsInput {
    @Field()
    @IsEnum(InteractionType)
    type!: InteractionType;

    @Field()
    fileId!: number;

    @Field()
    userId!: number;
  }
  