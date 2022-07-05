import createApp from "./app";
import { GetConfig, IConfig } from "./config";
import { MigrateDatabase } from "./database/migrations/MigrateDatabase";

async function start() {
  let config: IConfig;
  try {
    config = GetConfig();
  } catch (error) {
    console.error("Failed to read configuration, exiting");
    return process.exit(-1);
  }

  // This is a utility for dev purposes.
  // It might not be suitable to automatically run migrations in a production environment
  await MigrateDatabase({
    database: config.DATABASE_NAME,
    host: config.DATABASE_HOST,
    password: config.DATABASE_PASSWORD,
    port: config.DATABASE_PORT,
    user: config.DATABASE_USER,
  });

  const app = createApp();

  const server = app.listen(config.PORT, () => {
    console.log(`Server started on PORT ${config.PORT}`);
    console.log(`Visit http://localhost:${config.PORT}`);
  });

  process.on("SIGTERM", () => {
    server.close(() => {
      console.log("Process terminated");
    });
  });
}

void start();
