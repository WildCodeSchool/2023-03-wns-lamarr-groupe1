import {
    Length,
    IsOptional,
  } from "class-validator";
import { Field, InputType } from "type-graphql";

  @InputType()
  export class ReportsInput {
    
    @Field({ nullable: true })
    @Length(1)
    comment?: string;

    @Field()
    fileId!: number;

    @Field()
    userId!: number;
  }
  