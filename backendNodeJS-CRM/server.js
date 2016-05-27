// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mysql = require("mysql");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8089;        // set our port

// First you need to create a connection to the db
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "myCRM"
});

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
// do logging
console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here
// on routes that end in /bears
// ----------------------------------------------------
router.route('/clients')

  // create a client (accessed at POST http://localhost:8080/api/clients
  .post(function(req, res) {
      var employee = {name: req.body.name, location: req.body.location };
      con.query('INSERT INTO employees SET ?', employee, function(err,result){
        if(err) 
	        res.json(err);
        //console.log('Last insert ID:', result.insertId);
        res.json({message: 'Client added successfully.'});
      });
  })
  // get all the clients (accessed at GET http://localhost:8080/api/clients)
  .get(function(req, res) {
    con.query('SELECT * FROM employees',function(err,clients){
      if(err) 
        res.send(err);
		  //for (var i = 0; i < clients.length; i++) {
  		//  console.log(clients[i].name);
		  //};
      res.json(clients);
    });
  });

// on routes that end in /client/:id
// ----------------------------------------------------
router.route('/clients/:id')

  // get the client with that id (accessed at GET http://localhost:8080/api/clients/:id)
  .get(function(req, res) {

		con.query('SELECT * FROM employees where id=?',req.params.id ,function(err,clients){
      if(err)
        res.send(err);
      res.json(clients);
    });
  })
  // update the client with this id (accessed at PUT http://localhost:8080/api/clients/:id)
  .put(function(req, res) {
	  con.query('UPDATE employees SET location = ? Where ID = ?',	[req.body.location, req.params.id], function (err, result) {
      if (err) 
        res.send(err);
		  //console.log('Changed ' + result.changedRows + ' rows');
      res.json({ message: 'Bear updated!' });
  	});
    

        })
  // delete the client with this id (accessed at DELETE http://localhost:8080/api/clients/:id)
  .delete(function(req, res) {
	  con.query('DELETE FROM employees WHERE id = ?', [req.params.id], function (err, result) {
  	  if (err) 
        res.send(err);
	    //console.log('Deleted ' + result.affectedRows + ' rows');
      res.json({ message: 'Successfully deleted' });
 	  });
            
  });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
