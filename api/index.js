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
    const {name} = req.body;
    const names = `{"${id}": {"address": "${name}", "id": ${id}}}`;

    writeToJson(names);
    return res.send(names);
});

app.get('/address/:id', (req, res) => {

    const {id} = req.params;
    const fs = require('fs');

    let rawdata = fs.readFileSync('address.json');
    let data = JSON.parse(rawdata);

    try {
        return res.send(`The name ${data[id].name} are on id ${data[id].id}`); 
    } 
    catch {
        return res.send(`No name found on id ${id}`);
    }
});

async function writeToJson(newAddress) {
    const fs = require('fs');
    fs.writeFile('address.json', newAddress, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}