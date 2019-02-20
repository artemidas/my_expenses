/* eslint-env node */
const { Pool } = require("pg");
const config = require("config");

const db = config.get("db");

const client = new Pool({
  user: db.user,
  host: db.host,
  database: db.database,
  password: db.password,
  port: db.port
});

module.exports = client;
