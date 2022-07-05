import { migrate } from "postgres-migrations";

export const MigrateDatabase = async (dbConfig: DbConfig): Promise<void> => {
  try {
    await migrate(dbConfig, "./src/database/migrations");
    console.info("Successfully migrated database");
  } catch (error) {
    console.error("Failed to migrate database", error);
    throw error;
  }
};

export type DbConfig = {
  database: string;
  user: string;
  password: string;
  host: string;
  port: number;
};
