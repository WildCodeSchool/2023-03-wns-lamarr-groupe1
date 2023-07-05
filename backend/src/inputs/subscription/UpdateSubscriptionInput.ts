import { Length } from "class-validator"
import { Field, InputType } from "type-graphql"

@InputType()
export class UpdateSubscriptionInput {
  @Field()
  @Length(1, 255)
  status: string

  @Field()
  duration: string
}
