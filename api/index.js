const express = require('express');
const app = express();
const PORT = 8080;
const fs = require('fs');

app.listen(
    PORT,
    () => console.log(`API started local on port ${PORT}`)
)

app.use( express.json() )

app.post('/address/:id', (req, res) => {
    const {id} = req.params;
    const {address} = req.body;
    const {coordinates} = req.body;
    let rawdata = fs.readFileSync('address.json');
    let address_data = JSON.parse(rawdata);
    let in_json = address_data.addresses.map(in_json => {
        if (in_json.id == id) {
            return true;
        }    
    });
    if (in_json.includes(true)) {
        return res.send('id is already in use');
        
    }
    address_data['addresses'].push({
        'id': id,
        'address': address,
        'coordinates': coordinates
    });
    writeToJson(JSON.stringify(address_data));
    return res.send('Data successfully saved');
});

app.get('/address/:lat/:long/:max_distance', (req, res) => {

    const {lat} = req.params;
    const {long} = req.params;
    const {max_distance} = req.params;
    const list_to_send = [];

    let rawdata = fs.readFileSync('address.json');
    let address_data = JSON.parse(rawdata);

    for (i = 0; i < address_data['addresses'].length; i++) {     
        let distance = calculate_distance(address_data['addresses'][i].coordinates, [lat, long]);
        if (distance < max_distance){
            list_to_send.push(address_data['addresses'][i]);
        }
    }
    return res.send(list_to_send);

});

async function writeToJson(new_address) {
    fs.writeFile('address.json', new_address, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}

function calculate_distance(cords1, cords2) {
    const calculate = require('calculate-coordinates');
    let result = calculate.fromCoordinatesReturningM(cords1, cords2);
    return result
}