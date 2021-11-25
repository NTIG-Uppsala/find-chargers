let mysql = require('mysql');
let conn = mysql.createConnection({
  // Databas uppgifter
  host: 'find-chargers-database.mysql.database.azure.com',
  user: 'Ntindivid',
  password: '02_gula_tankar',
  database: 'findchargers'
});

let code = "insert_data";
let address_name = "Purjogatan 67";
let coordinates = [59.858593, 17.638674]
let coordinate_lat = coordinates[0];
let coordinate_lon = coordinates[1];

if (code == "get_data"){
  sql = "SELECT * FROM charger";
}
else if (code == "insert_data"){
  sql = `INSERT INTO charger(address, coordinate_lat, coordinate_lon) VALUES("${address_name}", ${coordinate_lat}, ${coordinate_lon});`;
}

conn.connect(function(err) {
  if (err) throw err;
  conn.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});