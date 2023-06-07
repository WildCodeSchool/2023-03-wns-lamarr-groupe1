import { DataSource } from "typeorm";
import { UsersModels } from "./models/UsersModels";

const dataSource = new DataSource({
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "postgres",
  password: "example",
  database: "postgres",

  synchronize: true,

  entities: [UsersModels],
});

export default dataSource;
