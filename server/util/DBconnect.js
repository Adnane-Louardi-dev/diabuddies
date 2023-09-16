const { Sequelize } = require("sequelize");
const mysql = require('mysql2/promise');

module.exports = async function initialize() {
    // create db if it doesn't already exist
    const databaseConnection =  {
        host: "localhost",
        port: "3306",
        user: "root",
        password: "example",
        database: "community" };
    const connection = await mysql.createConnection(databaseConnection);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${databaseConnection.database}\`;`);
    // connect to db
    const sequelize = new Sequelize(
        databaseConnection.database,
        databaseConnection.user,
        databaseConnection.password,
        { dialect: 'mysql' });

    // init models and add them to the exported db object

    // sync all models with database
    await sequelize.sync();
}

