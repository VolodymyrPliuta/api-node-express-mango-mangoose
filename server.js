// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Bear       = require('./app/models/bear');

mongoose.connect('mongodb://localhost:27017/travel'); // connect to our database

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests(for example validation happens in middleware)
router.use((req, res, next) => {
    // do logging
    console.log('Something is happening in.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', (req, res) => {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.get('/happy', (req, res) => {
    res.json({ message: 'API makes people happy!!' });   
});

router.get('/front-end', (req, res) => {
    res.json({ message: 'Front-End is awesome' });   
});

router.post('/front-end', (req, res) => {
    res.json({ message: 'Become the ninja' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
