import {
    Length,
    IsEnum
  } from "class-validator";
import { Field, InputType } from "type-graphql";
  
enum IssuesType {
  Open = "open",
  Pending = "pending",
  Close = "close"
}

  @InputType()
  export class IssuesInput {

    @Field()
    @Length(1, 100000)
    issue!: string;

    @Field()
    @IsEnum(IssuesType)
    status!: string;

    @Field()
    fileId!: number;

    @Field()
    userId!: number;
  }
  