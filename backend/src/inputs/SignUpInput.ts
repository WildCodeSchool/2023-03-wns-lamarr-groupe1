import { IsEmail, Length, MinLength, Matches } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class SignUpInput {
  @Field()
  @Length(1, 100)
  firstname!: string;

  @Field()
  @Length(1, 100)
  lastname!: string;

  @Field()
  @Length(1, 80)
  username!: string;

  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
  @MinLength(8)
  password!: string;
}
