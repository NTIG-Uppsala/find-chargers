const express = require('express');
const app = express();
const PORT = 8080;
const fs = require('fs');

let mysql = require('mysql');
let conn = mysql.createConnection({
  // Databas uppgifter
  host: 'charger-database.mysql.database.azure.com',
  user: 'Ntindivid',
  password: '02_gula_tankar',
  database: 'findchargers'
});

// listen for api calls
app.listen(
    PORT,
    () => console.log(`API started local on port ${PORT}`)
)

// makes api able to read json format
app.use( express.json() )

// find all chargers in range of position
app.get('/get-chargers-in-range/:lat/:long/:max_distance', (req, res) => {
    const {lat} = req.params;
    const {long} = req.params;
    const {max_distance} = req.params;
    const list_to_send = [];
    let sql = 'SELECT * FROM charger';

    conn.query(sql, function (err, result) {
        if (err) throw err;
        // filter chargers in range
        for (i = 0; i < result.length; i++) {     
            let distance = calculate_distance([result[i].coordinate_lat, result[i].coordinate_long], [lat, long]);
            if (distance < max_distance){
                list_to_send.push(result[i]);
            }
        }
        return res.send(list_to_send);
    });
});

// adds data to the database by sending it in json format
app.post('/post-charger', (req, res) => {
    const {body} = req;
    let sql = `INSERT INTO charger(
        address, 
        coordinate_lat, 
        coordinate_long, 
        ac_1, 
        ac_2, 
        chademo, 
        ccs, 
        user_input) 
        VALUES(
            "${body.address_name}", 
            ${body.coordinate_lat}, 
            ${body.coordinate_long}, 
            ${body.ac_1}, 
            ${body.ac_2}, 
            ${body.chademo}, 
            ${body.ccs}, 
            "${body.user_input}");
    INSERT INTO email(
        email_address)
        VALUES("${body.email_address}")`;
            
    conn.query(sql, function (err, result) {
        if (err) throw err;
        return res.send(body);
    });
    
});

// gets all charges in the database
app.get('/get-charger', (req, res) => {
    let sql = 'SELECT * FROM charger; SELECT email_address FROM email;';
    conn.query(sql, function (err, result) {
        if (err) throw err;
        return res.send(result);
    });  
})

// calculates distance between two coordinate points(returns in meters)
function calculate_distance(cords1, cords2) {
    const calculate = require('calculate-coordinates');
    let result = calculate.fromCoordinatesReturningM(cords1, cords2);
    return result
}