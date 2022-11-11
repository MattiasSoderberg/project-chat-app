import { createPool } from "slonik";
import { createUsersTable } from "./users-repository";
import { createRoomsTable } from "./rooms-repository";
import { createMessagesTable } from "./messages-repository";
import {
  createServersUsersTable,
  createServerTable,
} from "./servers-repository";
import dotenv from "dotenv";

dotenv.config();

const POSTGRES_URI = process.env.POSTGRES_URI as string;

export const pool = createPool(POSTGRES_URI);

export const setUpTables = async () => {
  await createUsersTable();
  await createServerTable();
  await createServersUsersTable();
  await createRoomsTable();
  await createMessagesTable();
};
