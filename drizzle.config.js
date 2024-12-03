/** @type {import("drizzle-kit").Config} */

export default {
  schema: "./config/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:dQpjPyi0KMJ7@ep-wispy-wave-a547x7pr.us-east-2.aws.neon.tech/neondb?sslmode=require",
  },
};
