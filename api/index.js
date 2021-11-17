const express = require('express');
const app = express();
const PORT = 8080;

app.listen(
    PORT,
    () => console.log(`API started local on port ${PORT}`)
)

app.use( express.json() )

app.post('/address/:id', (req, res) => {

    const {id} = req.params;
    const {address} = req.body;
    const address_data = `{"${id}": {"address": "${address}", "id": ${id}}}`;

    writeToJson(address_data);
    return res.send(address_data);
});

app.get('/address/:id', (req, res) => {

    const {id} = req.params;
    const fs = require('fs');

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
    const fs = require('fs');
    fs.writeFile('address.json', new_address, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}