import { Transaction } from "@/types/Transaction";
import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabaseSync("Transactions.db");

export const init = async () =>
  await database.execAsync(
    `CREATE TABLE IF NOT EXISTS Transactions (
    name TEXT PRIMARY KEY NOT NULL,
    type TEXT NOT NULL,
    amount INTEGER NOT NULL,
    category TEXT NOT NULL,
    date INTEGER NOT NULL,
    description TEXT NULL
  )`
  );

  export const insertTransaction = async (transaction:Transaction) =>
    await database.runAsync(
      `INSERT INTO Transactions (name, type, amount, category, date, description) VALUES (?, ?, ?, ?, ?, ?)`,
      transaction.name,
      transaction.type,
      transaction.amount,
      transaction.category,
      transaction.date,
      transaction.description
    );
export const deleteTransaction = async (transaction:Transaction) =>
    await database.runAsync(
    `DELETE FROM Transactions WHERE name = ?`,
    transaction.name
    );

export const fetchEntries = async () =>
  await database.getAllAsync("SELECT * FROM Transactions");
