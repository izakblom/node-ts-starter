import { Response } from "express";
import { Client } from "pg";
import { GetConfig } from "../config";

const config = GetConfig();

export async function WithConnectionAsync(
  callback: (connection: Client) => Promise<Response>
): Promise<void> {
  let connection: Client;
  try {
    const connection = new Client({
      database: config.DATABASE_NAME,
      host: config.DATABASE_HOST,
      user: config.DATABASE_USER,
      password: config.DATABASE_PASSWORD,
      port: config.DATABASE_PORT,
    });
    await connection.connect();
    console.log("Connection opened");

    await callback(connection);
  } finally {
    await connection?.end();
    console.log("Connection closed");
  }
}
