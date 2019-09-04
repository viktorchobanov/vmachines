var express = require('express');
var app = express();

var fs = require('fs');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');
var cors = require('cors')
const keys = require('./app/config/config');

var Product = require('./app/models/Product');
var User = require('./app/models/User')

var port = process.env.PORT || 4000;

app.use(cors())
// app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "build")))
app.use('/api', appRoutes);

var options = {
    user: keys.mongoName || process.env.mongoName,
    pass: keys.mongoPass || process.env.mongoPass
}

var uri = keys.uri || process.env.uri;

mongoose.connect(uri, options)
    .then(() => {
        console.log('Connected!');
    })
    .catch((err) => {
        console.log('Connection Error!');
    });

app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname, '/build/index.html'));
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
