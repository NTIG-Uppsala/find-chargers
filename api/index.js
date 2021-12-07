const express = require('express');
const app = express();
const { check, body, validationResult } = require('express-validator');
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
app.get('/get-chargers-in-range/:lat/:long/:max_distance',[
    check('lat').isNumeric().trim().escape(),
    check('long').isNumeric().trim().escape(),
    check('max_distance').isNumeric().trim().escape()
  ],
   (req, res) => {
    const lat = req.params.lat;
    const long = req.params.long;
    const max_distance = req.params.max_distance;
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
app.post('/post-charger', [ 
    body('email_address', "Must be a valid email!").isEmail().normalizeEmail(),
    body('address', "Must not be empty!").not().isEmpty().escape(),
    body('coordinate_lat', "Must be a number!").isNumeric().trim().escape(),
    body('coordinate_long', "Must be a number!").isNumeric().trim().escape(),
    body('ac_1').toBoolean().escape(), //gör en string som är "true" eller "false". Inte en faktisk bool!
    body('ac_2').toBoolean().escape(),
    body('chademo').toBoolean().escape(),
    body('ccs').toBoolean().escape(),
    body('user_input').escape()

 ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
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
                return res.send(result);
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

app.get('/get-charger-by-email/:email', [
    check('email', "Must be a valid email!").isEmail().normalizeEmail()
  ],
   (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const email = req.params.email;
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

app.delete('/delete-charger-by-id/:id/:email',[
    check('email', "Must be a valid email!").isEmail().normalizeEmail(),
    check('id', "Must be a number!").isNumeric().trim().escape()
  ],
   (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id;
    const email = req.params.email;
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

app.put('/change-charger-visibility/:id/:is_visible/:email', [
    check('email', "Must be a valid email!").isEmail().normalizeEmail(),
    check('id', "Must be a number!").isNumeric().trim().escape(),
    check('is_visible').toBoolean().escape() //gör en string som är "true" eller "false". Inte en faktisk bool!
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const id = req.params.id;
    const is_visible = req.params.is_visible;
    const email = req.params.email;
    let visibility_status;
    let id_exist = false;
    let sql1 = `SELECT * FROM charger WHERE id IN (
        SELECT id FROM email WHERE email_address = "${email}"
        );`;
    let sql2 = `UPDATE charger SET is_visible = ${is_visible} WHERE id = ${id}`;
    try{
        conn.query(sql1, function (err, result) {
            if (err) throw err;
            for (i = 0; i < result.length; i++) { 
                if (result[i].id == id){
                    id_exist = true
                    visibility_status = result[i]['is_visible'];
                    break
                }
            }
            if (id_exist) {
                if (visibility_status != is_visible) {
                    conn.query(sql2, function (err) {
                        if (err) throw err;
                        if (is_visible == "true") {
                            return res.send('Charger changed to active');
                        }
                        else {
                            return res.send('Charger changed to inactive');
                        }
                    });
                }
            }
            else {
                return res.send('Email or id is incorrect');
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