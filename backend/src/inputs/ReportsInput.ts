import {
    Length,
    IsEnum,
  } from "class-validator";
import { Field, InputType } from "type-graphql";

  @InputType()
  export class ReportsInput {
    @Field()
    id!: number;

    @Field()
    comment: string;

    @Field()
    fileId!: number;

    @Field()
    userId!: number;

    @Field()
    createdAt!: number;
  }
  