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
        'address': address
    });
    writeToJson(JSON.stringify(address_data));
    return res.send('Data successfully saved');
});

app.get('/address/:id', (req, res) => {

    const {id} = req.params;

    let rawdata = fs.readFileSync('address.json');
    let data = JSON.parse(rawdata);

    try {
        return res.send(data); 
    } 
    catch {
        return res.send(`No name found on id ${id}`);
    }
});

async function writeToJson(new_address) {
    fs.writeFile('address.json', new_address, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}