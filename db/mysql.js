const mysql = require("mysql");

var dbConn = mysql.createConnection({
  user: "root",
  password: "",
  host: "localhost",
  database: "proje_kds",
});

dbConn.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Bağlantı Başarılı");
  }
});

module.exports = dbConn;
