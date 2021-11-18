let mysql = require('mysql');
let conn = mysql.createConnection({
  // Databas uppgifter
  host: 'Localhost',
  user: 'root',
  password: '02_gula_tankar',
  database: 'findchargers'
});

conn.connect(function(err) {
  if (err) throw err;
  conn.query("SELECT * FROM charger", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});