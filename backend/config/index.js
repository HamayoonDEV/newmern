import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const DATABASE_CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING;
const ACCESS_TOKEN_STRING = process.env.ACCESS_TOKEN_STRING;
const REFRESG_TOKEN_STRING = process.env.REFRESG_TOKEN_STRING;
const BACKEND_SERVER_PATH = process.env.BACKEND_SERVER_PATH;

export {
  PORT,
  DATABASE_CONNECTION_STRING,
  ACCESS_TOKEN_STRING,
  REFRESG_TOKEN_STRING,
  BACKEND_SERVER_PATH,
};
