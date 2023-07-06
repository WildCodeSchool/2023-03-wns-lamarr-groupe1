import {
    Length,
  } from "class-validator";
import { Field, InputType } from "type-graphql";
  
  @InputType()
  export class CommentsInput {
    @Field()
    @Length(1, 100000)
    comment!: string;

    // @Field()
    // createdAt!: Date;

    // @Field()
    // updatedAt!: Date;

    @Field()
    fileId!: number;

    @Field()
    userId!: number;
  }
  