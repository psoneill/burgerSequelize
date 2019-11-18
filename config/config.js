require('dotenv').config();
module.exports = {
  "development": {
    "username": process.env.MYSQL_USER,
    "password": process.env.MYSQL_KEY,
    "database": "burger_db",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "test": {
    "username": process.env.MYSQL_USER,
    "password": process.env.MYSQL_KEY,
    "database": "burger_db",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "operatorsAliases": false
  }
}
