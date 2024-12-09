import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./database.sqlite");

const DbInit = async () => {
  await RunDb(
    "CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, email TEXT, userClass TEXT)"
  );
};

function DbQuery(sql, params) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function RunDb(sql, params) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID });
      }
    });
  });
}

export { db, DbInit, DbQuery, RunDb };