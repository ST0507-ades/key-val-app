require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool(process.env.DATABASE_URL);
const poolPromise = pool.promise();

module.exports.initDb = function initDb() {
    const dropTableSql = `
        DROP TABLE IF EXISTS key_val_tab;
    `;
    const createTableSql = `
        CREATE TABLE key_val_tab (
            k VARCHAR(255) PRIMARY KEY,
            v VARCHAR(255) NOT NULL
        )`;
    return poolPromise.query(dropTableSql).then(function () {
        return poolPromise.query(createTableSql);
    });
};

module.exports.set = function set(key, value) {
    const sql = `INSERT INTO key_val_tab (k, v) VALUES (?, ?) ON DUPLICATE KEY UPDATE v = ?`;
    const params = [key, value, value];
    return poolPromise.query(sql, params);
};

module.exports.get = function get(key) {
    const sql = `SELECT v FROM key_val_tab WHERE k = ?`;
    const params = [key];
    return poolPromise.query(sql, params).then(function (result) {
        const rows = result[0];
        if (!rows.length) return null;
        const value = rows[0].v;
        return value;
    });
};

module.exports.end = function end() {
    return poolPromise.end();
};
