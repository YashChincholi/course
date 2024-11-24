require("dotenv").config({ path: ".env.local" });

/** @type { import("drizzle-kit").Config } */

console.log(process.env.NEXT_PUBLIC_DB_CONNECTION_STRING);

export default {
  schema: "./configs/schema.jsx",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DB_CONNECTION_STRING,
  },
};
