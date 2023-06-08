import { DataSource } from "typeorm";
import { UsersModels } from "./models/UsersModels";
import { IssuesModels } from "./models/IssuesModels";
import { ContactModels } from "./models/ContactModels";
import { CommentsModels } from "./models/CommentsModels";
import { ReportsModels } from "./models/ReportsModels";
import { InteractionsModels } from "./models/InteractionsModels";
import { FilesModels } from "./models/FilesModels";
import { SubscriptionModels } from "./models/SubscriptionModels";
import { LanguageModels } from "./models/LanguageModels";

const dataSource = new DataSource({
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "postgres",
  password: "example",
  database: "postgres",

  synchronize: true,

  entities: [
    UsersModels,
    IssuesModels,
    ContactModels,
    CommentsModels,
    ReportsModels,
    InteractionsModels,
    FilesModels,
    SubscriptionModels,
    LanguageModels,
  ],
});

export default dataSource;
