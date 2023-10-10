const express = require('express');
const bodyParser = require('body-parser');

const port = 8080; 

const {calculatePost, getCell, getSheet} = require('./controller/apiController.js')

const app = express();

app.use(bodyParser.json());

app.get('/api/v1/:sheet_id',getSheet)
app.get('/api/v1/:sheet_id/:cell_id',getCell)

app.post('/api/v1/:sheet_id/:cell_id',calculatePost);


app.listen(port, () => {
    console.log(`PORT ${port}`);
});
