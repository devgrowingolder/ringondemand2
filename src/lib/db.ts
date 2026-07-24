import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";

type Database = PostgresJsDatabase<typeof schema>;

declare global {
  var __ridDatabase__: Database | undefined;
  var __ridPostgresClient__: ReturnType<typeof postgres> | undefined;
}

export function getDatabase(): Database | null {
  if (!process.env.DATABASE_URL) return null;

  if (!globalThis.__ridDatabase__) {
    const client = postgres(process.env.DATABASE_URL, {
      max: 4,
      prepare: false,
      idle_timeout: 20,
    });
    globalThis.__ridPostgresClient__ = client;
    globalThis.__ridDatabase__ = drizzle(client, { schema });
  }

  return globalThis.__ridDatabase__;
}
