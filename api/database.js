let mysql = require('mysql');
let conn = mysql.createConnection({
  // Databas uppgifter
  host: 'charger-database.mysql.database.azure.com',
  user: 'Ntindivid',
  password: '02_gula_tankar',
  database: 'findchargers'
});

let code = "get_data";
let address_name = "Purjogatan 67";
let coordinates = [59.858593, 17.638674]
let coordinate_lat = coordinates[0];
let coordinate_long = coordinates[1];
let email_address = "jonatan.mone@elev.ga.ntig.se";
let ac_1 = true;
let ac_2 = false;
let chademo = false;
let ccs = false;
let user_input = "Test.";

if (code == "get_data"){
  sql = "SELECT * FROM charger";
}
else if (code == "insert_data"){
  sql = `INSERT INTO charger(address, coordinate_lat, coordinate_long, email_address, ac_1, ac_2, chademo, ccs, user_input) VALUES("${address_name}", ${coordinate_lat}, ${coordinate_long}, "${email_address}", ${ac_1}, ${ac_2}, ${chademo}, ${ccs}, "${user_input}");`;
}

conn.connect(function(err) {
  if (err) throw err;
  conn.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});