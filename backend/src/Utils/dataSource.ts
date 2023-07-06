import { DataSource } from "typeorm";
import { join } from "path";

const dataSource = new DataSource({
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "postgres",
  password: "example",
  database: "postgres",

  synchronize: true,

  entities: [join(__dirname, "../models/**.ts")],
});

export default dataSource;
