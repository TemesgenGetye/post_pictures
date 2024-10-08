import * as schema from "./schema";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";

// Use this object to send drizzle queries to your DB
export const db = drizzle(sql, { schema });
