'use strict';


//##### Deps #####//
const express = require('express');
const app = express();
const { check, body, validationResult } = require('express-validator');
const haversine = require('haversine-distance')


//##### Port conf #####//
const PORT = process.env.PORT || 8080;


//##### MySQL config #####//
let mysql = require('mysql');
let conn = mysql.createConnection({
    host: 'charger-database.mysql.database.azure.com',
    user: 'Ntindivid',
    password: '02_gula_tankar',
    database: 'findchargers'
});


//##### Express config #####//
app.listen(PORT, () => console.log(`API started local on port ${PORT}`)); // Sets up listen port.
app.use(express.json()) //Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.


/**
 * Gets all chargers in range
 * 
 * @method GET
 * 
 * @requires {express} - Express is used for http actions.
 * @requires {haversine-distance} - haversine-distance is used to calculate cistance between 2 coordinates.
 * @requires {mysql} - mysql is used to talk with a mysql database.
 * 
 * @param {Float} lat - Latitude in a float.
 * @param {Float} long - Longitude in a float.
 * @param {Float} max_distance - Max distance of a charger to be returned.
 *
 * @return {httpResponse} Returns a express httpResponse.
 *
*/
app.get('/get-chargers-in-range/:lat/:long/:max_distance', [
        check('lat', "Must be a number!").isNumeric(),
        check('long', "Must be a number!").isNumeric(),
        check('max_distance', "Must be a number!").isNumeric()
    ],
    (req, res) => {
        //## Return with parsing error ##//
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        //## Variables from params ##//
        let lat = req.params.lat;
        let long = req.params.long;
        let max_distance = req.params.max_distance;

        //## Try Catch for query errors ##//
        try {
            //## Sending query ##//
            conn.query('SELECT * FROM charger', function (error, result) {
                //## Throw if query error ##//
                if (error) throw error;
                //## Check all elements for distance ##//
                let valid_chargers = result.map(function (element) {
                    console.log(haversine([element.coordinate_lat, element.coordinate_long], [lat, long]));
                    //## Calculate distance and return if its larger than max_distance and check that the charger should be visible ##//
                    if ((haversine([element.coordinate_lat, element.coordinate_long], [lat, long]) <= max_distance) && element.is_visible) { 
                        return element;
                    }
                }, this).filter(x => x); // https://stackoverflow.com/a/41346932 - Filtrerar ut "", null, undefined och NaN
                return res.send(valid_chargers); // Svarar med lisa på chargers innom distansen satt.
            });
        }
        catch (error) {
            console.error(error);
        }
    });


/**
 * Gets all chargers
 * 
 * @method GET
 * 
 * @requires {express} - Express is used for http actions.
 * @requires {mysql} - mysql is used to talk with a mysql database.
 *
 * @return {httpResponse} Returns a express httpResponse.
 *
*/
app.get('/get-charger', (req, res) => {
    //## Try Catch for query errors ##//
    try {
        //## Sending query ##//
        conn.query("SELECT * FROM charger LEFT OUTER JOIN email ON charger.id = email.id",
            function (err, result) {
                //## Throw if query error ##//
                if (err) throw err;
                //## Return Result ##//
                return res.send(result);
            });
    } 
    catch (err) {
        console.error(err);
    }
});


/**
 * Gets a charger by email specified by user
 * 
 * @method GET
 * 
 * @requires {express} - Express is used for http actions.
 * @requires {mysql} - mysql is used to talk with a mysql database. 
 * 
 * @param {String} email - Email specified by user
 * 
 * @return {httpResponse} Returns a express httpResponse.
 */

app.get('/get-charger-by-email/:email', [
        check('email', "Must be a valid email!").isEmail().normalizeEmail()
    ],
    (req, res) => {
        //## Return with parsing error ##//
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const email = req.params.email;

        let sql = `SELECT * FROM charger WHERE id IN (
            SELECT id FROM email WHERE email_address = ?
            );`;
        sql = mysql.format(sql, email);
        try {
            conn.query(sql, function (err, result) {
                if (err) throw err;
                return res.send(result);
            });
        } catch (err) {
            console.error(err);
        }
    });

/**
 * Adds a charger to database using given information
 * 
 * @method POST
 * 
 * @requires {express} - Express is used for http actions.
 * @requires {mysql} - mysql is used to talk with a mysql database.
 * 
 * @param {json} body - Takes a JSON object in the body.
 * 
 * @return {httpResponse} Returns a express httpResponse.
 */
app.post('/post-charger', [
        body('email_address', "Must be a valid email!").isEmail().normalizeEmail(),
        body('address', "Must not be empty!").not().isEmpty(),
        body('coordinate_lat', "Must be a number!").isNumeric(),
        body('coordinate_long', "Must be a number!").isNumeric(),
        body('ac_1').toBoolean(), //gör en string som är "true" eller "false". Inte en faktisk bool!
        body('ac_2').toBoolean(),
        body('chademo').toBoolean(),
        body('ccs').toBoolean()

    ],
    (req, res) => {
        //## Return with parsing error ##//
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            body
        } = req;
        let sql1 = `INSERT INTO charger(
                    address, 
                    coordinate_lat, 
                    coordinate_long, 
                    ac_1, 
                    ac_2, 
                    chademo, 
                    ccs, 
                    user_input) 
                    VALUES
                    (?, ?, ?, ?, ?, ?, ?, ?);`

        var inserts1 = [body.address, body.coordinate_lat, body.coordinate_long, body.ac_1, body.ac_2, body.chademo, body.ccs, body.user_input];
        sql1 = mysql.format(sql1, inserts1);


        let sql2 = mysql.format(`INSERT INTO email (email_address) VALUES (?);`, body.email_address);

        try {
            conn.query(sql1, function (err, result) {
                if (err) throw err;
                conn.query(sql2, function (err, result) {
                    if (err) throw err;
                    return res.send(result);
                });
            });
        } catch (err) {
            console.error(err);
        }

    });


/**
 * Deletes a charger by id with email as verification
 * 
 * @method DELETE
 * 
 * @requires {express} - Express is used for http actions.
 * @requires {mysql} - mysql is used to talk with a mysql database.
 * 
 * @param {String} email - Email specified by user.
 * @param {int} id - ID of a charger.
 * 
 * @return {httpResponse} Returns a express httpResponse.
 */
app.delete('/delete-charger-by-id/:id/:email', [
        check('email', "Must be a valid email!").isEmail().normalizeEmail(),
        check('id', "Must be a number!").isNumeric()
    ],
    (req, res) => {
        //## Return with parsing error ##//
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const id = req.params.id;
        const email = req.params.email;

        let id_exist = false

        let sql1 = mysql.format('SELECT * FROM charger WHERE id IN (SELECT id FROM email WHERE email_address = ?);', email);
        let sql2 = mysql.format(`DELETE FROM charger WHERE id = ?;`, id);

        try {
            conn.query(sql1, function (err, result) {
                if (err) throw err;
                id_exist = result.map(function (element) {
                    if (element.id == id) {
                        return true;
                    }
                }, this);

                if (id_exist) {
                    conn.query(sql2, function (err, result) {
                        if (err) throw err;
                        return res.send('Deletion successful');
                    });
                } else {
                    return res.send('Id not connected to email');
                }
            });
        } catch (err) {
            console.error(err);
        }
    });

/**
 * Updates a chargers visibility
 * 
 * @method PUT
 * 
 * @requires {express} - Express is used for http actions.
 * @requires {mysql} - mysql is used to talk with a mysql database.
 * 
 * @param {String} email - Email specified by user.
 * @param {int} id - ID of a charger.
 * @param {bool} is_visible - Bool to set the visibility to.
 * 
 * @return {httpResponse} Returns a express httpResponse.
 */
app.put('/change-charger-visibility/:id/:is_visible/:email', [
        check('email', "Must be a valid email!").isEmail().normalizeEmail(),
        check('id', "Must be a number!").isNumeric(),
        check('is_visible').toBoolean()
    ],
    (req, res) => {
        //## Return with parsing error ##//
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const id = req.params.id;
        const is_visible = req.params.is_visible;
        const email = req.params.email

        let sql1 = mysql.format(`SELECT * FROM charger LEFT OUTER JOIN email ON charger.id = email.id WHERE email.email_address = ? AND charger.id = ?;`, [email, id]);
        let sql2 = mysql.format(`UPDATE charger SET is_visible = ? WHERE id = ?`, [is_visible, id]);

        try {
            conn.query(sql1, function (err, result) {
                if (err) throw err;
                let id_element = result.map(function (element) {
                    if (element.id == id) {
                        return element;
                    }
                }, this).filter(x => x); // https://stackoverflow.com/a/41346932 - Filtrerar ut "", null, undefined och NaN return res.send('Visibility already set to ' + is_visible);

                if (id_element[1] != null ) return res.send('More than one result. Please contact a admin.');

                if (id_element[0] == null ) return res.send('Email or id is incorrect');

                if(id_element[0].is_visible == is_visible) return res.send('Visibility already set to ' + is_visible);

                conn.query(sql2, function (err) {
                    if (err) throw err;

                    if (is_visible) return res.send('Charger changed to active');

                    return res.send('Charger changed to inactive');
                });
            });
        } catch (err) {
            console.error(err);
        }
    });
