import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, ManyToOne } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { IssuesModels } from "./IssuesModels";
import { CommentsModels } from "./CommentsModels";
import { ReportsModels } from "./ReportsModels";
import { InteractionsModels } from "./InteractionsModels";
import { UsersModels } from "./UsersModels";
import { LanguageModels } from "./LanguageModels";

@ObjectType()
@Entity()
export class FilesModels extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  filename: string;

  @Field()
  @Column()
  content: string;

  @Field()
  @Column()
  is_public: boolean;

  @Field()
  @Column()
  created_at: Date;

  @Field()
  @Column()
  updated_at: Date;

  @Field()
  @Column()
  nb_of_report: number;

  @Field()
  @Column()
  nb_of_download: number;

  @Field(() => [IssuesModels])
  @OneToMany(() => IssuesModels, (issue) => issue.file)
  issues: IssuesModels[];

  @Field(() => [CommentsModels])
  @OneToMany(() => CommentsModels, (comment) => comment.file)
  comments: CommentsModels[];

  @Field(() => [ReportsModels])
  @OneToMany(() => ReportsModels, (report) => report.file)
  reports: ReportsModels[];

  @Field(() => [InteractionsModels])
  @OneToMany(() => InteractionsModels, (interaction) => interaction.file)
  interactions: InteractionsModels[];

  @Field(() => [UsersModels])
  @ManyToOne(() => UsersModels, (user) => user.files)
  user: UsersModels;

  @Field(() => [LanguageModels])
  @ManyToOne(() => LanguageModels, (language) => language.files)
  language: LanguageModels;
}