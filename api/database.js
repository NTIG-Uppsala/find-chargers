let mysql = require('mysql');
let conn = mysql.createConnection({
  // Databas uppgifter
  host: 'Localhost',
  user: 'root',
  password: '02_gula_tankar',
  database: 'findchargers'
});

code = "insert_data";
address_name = "Purjogatan 67";

if (code == "get_data"){
  sql = "SELECT * FROM charger";
}
else if (code == "insert_data"){
  sql = `INSERT INTO charger(address) VALUES("${address_name}");`;
}

conn.connect(function(err) {
  if (err) throw err;
  conn.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});