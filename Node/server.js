const express = require('express');
const bodyParser = require('body-parser');
var app = express();
const userRoutes = require('./routes/userroute');
var cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use('/user', userRoutes);

app.use(function (req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.write('you posted:\n')
    res.end(JSON.stringify(req.body, null, 2))
  })

app.listen(3000);


module.exports = app