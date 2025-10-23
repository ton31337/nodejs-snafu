const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;

let queryMessage = "Loading...";

const connection = mysql.createConnection({
  socketPath: '/var/run/mysqld/mysqld.sock',
  user: 'donatas',
  password: 'donatas',
  database: 'mysql'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    queryMessage = "Database connection error";
    return;
  }
  console.log('Connected to MySQL via Unix socket');

  connection.query("SELECT 'Hello World from MySQL!' as message", (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      queryMessage = "Query execution error";
      return;
    }
    queryMessage = results[0].message;
    console.log('Query result:', results[0].message);
  });
});

app.get("/", (req, res) => {
  res.send(queryMessage);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
