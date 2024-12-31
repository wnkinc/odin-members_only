#! /usr/bin/env node

require("dotenv").config(); // Load environment variables from .env file
const { Client } = require("pg");

// Use the appropriate connection string based on the environment
const dbUrl = process.env.DATABASE_URL || process.env.DB_LOCAL_URL;

const client = new Client({
  connectionString: dbUrl,
});

const SQL = `
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    membership_status BOOLEAN DEFAULT FALSE,
    admin BOOLEAN DEFAULT FALSE,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(100) NOT NULL,
    text TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);
`;

async function main() {
  try {
    console.log("Connecting to:", dbUrl);

    await client.connect(); // Connect to the database

    console.log("Seeding data...");
    await client.query(SQL); // Run the SQL query to create table and insert data

    console.log("Seeding complete.");
  } catch (err) {
    console.error("Error during database operation:", err);
  } finally {
    await client.end(); // Always close the client connection
  }
}

main();
