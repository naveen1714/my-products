//app.js
const express = require('express');
const bodyParser = require('body-parser');
const product = require('./routes/product.route'); // Imports routes for the products
const app = express();
const mongoose = require('mongoose');
var cors = require('cors');
const logger = require('morgan');
const PORT = process.env.PORT || 5000


app.use(cors());
// Set up mongoose connection
const dbConfig = "mongodb+srv://naveen1714:Naveen@1@cluster0-ou6n9.mongodb.net/ProductDB";

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('dev'));

app.use('/products', product);
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))