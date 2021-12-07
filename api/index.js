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

    try{    
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
    }
    catch(err){
        console.error(err);
    }
});

// adds data to the database by sending it in json format
app.post('/post-charger', (req, res) => {
    const {body} = req;
    let sql_1 = `INSERT INTO charger(
        address, 
        coordinate_lat, 
        coordinate_long, 
        ac_1, 
        ac_2, 
        chademo, 
        ccs, 
        user_input) 
        VALUES(
            "${body.address}", 
            ${body.coordinate_lat}, 
            ${body.coordinate_long}, 
            ${body.ac_1}, 
            ${body.ac_2}, 
            ${body.chademo}, 
            ${body.ccs}, 
            "${body.user_input}");`

    let sql_2 = `INSERT INTO email(
        email_address)
        VALUES("${body.email_address}");`;

    try{ 
        conn.query(sql_1, function (err, result) {
            if (err) throw err;
            conn.query(sql_2, function (err, result) {
                if (err) throw err;
                return res.send(body);
            });
        });
    }
    catch(err){
        console.error(err);
    }
    
});

// gets all charges in the database
app.get('/get-charger', (req, res) => {
    let sql = 'SELECT * FROM charger LEFT OUTER JOIN email ON charger.id = email.id;';
    try{ 
        conn.query(sql, function (err, result) {
            if (err) throw err;
            return res.send(result);
        });
    }
    catch(err){
        console.error(err);
    }
});

app.get('/get-charger-by-email/:email', (req, res) => {
    const {email} = req.params;
    let sql = `SELECT * FROM charger WHERE id IN (
            SELECT id FROM email WHERE email_address = "${email}"
            );`;
    try{ 
        conn.query(sql, function (err, result) {
            if (err) throw err;
            return res.send(result);
        });
    }
    catch(err){
        console.error(err);
    }
});

app.post('/delete-charger-by-id/:id/:email', (req, res) => {
    const {id} = req.params;
    const {email} = req.params;
    let id_exist = false
    let sql1 = `SELECT * FROM charger WHERE id IN (
        SELECT id FROM email WHERE email_address = "${email}"
        );`;
    let sql2 = `DELETE FROM charger WHERE id = ${id};`
    try{ 
        conn.query(sql1, function (err, result) {
            if (err) throw err;
            for (i = 0; i < result.length; i++) { 
                if (result[i].id == id){
                    id_exist = true
                    break
                }
            }
            if (id_exist) {
                conn.query(sql2, function (err, result) {
                    if (err) throw err;
                    return res.send('Deletion successful');
                });
            }
            else {
                return res.send('Id not connected to email');
            }
        });
    }
    catch(err){
        console.error(err);
    }
});

// calculates distance between two coordinate points(returns in meters)
function calculate_distance(cords1, cords2) {
    const calculate = require('calculate-coordinates');
    let result = calculate.fromCoordinatesReturningM(cords1, cords2);
    return result
}