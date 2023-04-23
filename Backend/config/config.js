const assert = require("assert");
const dotenv = require("dotenv");

// read all the contents of the .env file
dotenv.config();
const maxAge = 30 * 24 * 60 * 60;
const { PORT, sql_user, sql_password, sql_server, sql_database ,jwt_key } = process.env;

// validate the required configuration information
assert(PORT, "PORT configuration is required.");
assert(sql_server, "SQL_SERVER configuration is required.");
assert(sql_database, "SQL_DATABASE configuration is required.");
assert(sql_user, "SQL_USER configuration is required.");
assert(sql_password, "SQL_PASSWORD configuration is required.");
assert(jwt_key, "jwt_key configuration is required.");

// export the configuration information
module.exports = {
  port: PORT,
  sql: {
    server: sql_server,
    database: sql_database,
    user: sql_user,
    password: sql_password,
    options: {
        trustedConnection: true,
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true,
    
      },
  },
  JWT:{
    key:jwt_key,
    expiration:maxAge
  }
};
