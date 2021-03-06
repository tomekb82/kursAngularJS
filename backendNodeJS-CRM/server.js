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

// on routes that end in /clients/:id/timeline
// ----------------------------------------------------
router.route('/clients/:id/timeline')
  
  // create a timeline (accessed at POST http://localhost:8080/api/clients/:id/timeline
  .post(function(req, res) {
    var timeline = req.body;
    timeline.client_id = req.params.id;
    console.log(timeline);
      con.query('INSERT INTO contact_timeline SET ?', timeline, function(err,result){
        if(err) 
          res.json(err);
        con.query('select t.*, u.name as user_name from contact_timeline as t left join users as u on t.user_id = u.id where t.client_id=?',req.params.id ,function(err,timeline){
          if(err)
            res.send(err);
          res.json(timeline);
        });
      });
  })

  // get the timeline with that id (accessed at GET http://localhost:8080/api/clients/:id/timeline)
  .get(function(req, res) {

    con.query('select t.*, u.name as user_name from contact_timeline as t left join users as u on t.user_id = u.id where t.client_id=?',req.params.id ,function(err,timeline){
      if(err)
        res.send(err);
      res.json(timeline);
    });
  });

// on routes that end in /clients/:id/timeline/:eventId
// ----------------------------------------------------
router.route('/clients/:id/timeline/:eventId')  

  // update the timeline with this id (accessed at PUT http://localhost:8080/api/clients/:id/timeline/:eventId)
  .put(function(req, res) {  

    var event = req.body;
    console.log(event);

    con.query('UPDATE contact_timeline SET \
      user_id=?, \
      contact_date=?, \
      contact_type=?, \
      notes=? \
      Where ID = ?',  
        [ event.user_id,
          event.contact_date,
          event.contact_type,
          event.notes,
          req.params.eventId], function (err, result) {
      if (err) 
        res.send(err);
      con.query('select t.*, u.name as user_name from contact_timeline as t left join users as u on t.user_id = u.id where t.client_id=?',req.params.id ,function(err,timeline){
        if(err)
          res.send(err);
        console.log(timeline);
        res.json(timeline);
      });
    });
  })

   // delete the timeline with this id (accessed at DELETE http://localhost:8080/api/clients/:id/timeline)
  .delete(function(req, res) {
    con.query('DELETE FROM contact_timeline WHERE id = ? and client_id = ? ', [req.params.eventId, req.params.id], function (err, result) {
      if (err) {
        console.log(err);
        res.send(err);
      }else{
        //console.log('Deleted ' + result.affectedRows + ' rows');
        con.query('select t.*, u.name as user_name from contact_timeline as t left join users as u on t.user_id = u.id where t.client_id=?',req.params.id ,function(err,timeline){
          if(err){
            res.send(err);
          }
          console.log(timeline);
          res.json(timeline);
        });
      }
    });
            
  });

// on routes that end in /users
// ----------------------------------------------------
router.route('/users')

  // create a user (accessed at POST http://localhost:8080/api/users
  .post(function(req, res) {
      con.query('INSERT INTO users SET ?', req.body, function(err,result){
        if(err) 
          res.json(err);
        //console.log('Last insert ID:', result.insertId);
        res.json({message: 'User added successfully.'});
      });
  })

  // get all the users (accessed at GET http://localhost:8080/api/users)
  .get(function(req, res) {
    con.query('SELECT * FROM users',function(err,users){
      if(err) 
        res.send(err);
      //for (var i = 0; i < users.length; i++) {
      //  console.log(users[i].name);
      //};
      res.json(users);
    });
  });

// on routes that end in /users/:id
// ----------------------------------------------------
router.route('/users/:id')

  // get the user with that id (accessed at GET http://localhost:8080/api/users/:id)
  .get(function(req, res) {

    con.query('SELECT * FROM users where id=?',req.params.id ,function(err,users){
      if(err)
        res.send(err);
      res.json(users);
    });
  })

// on routes that end in /sectors
// ----------------------------------------------------
router.route('/sectors')

  // get all the users (accessed at GET http://localhost:8080/api/sectors)
  .get(function(req, res) {
    con.query('SELECT * FROM company_sectors',function(err,sectors){
      if(err) 
        res.send(err);
      //for (var i = 0; i < sectors.length; i++) {
      //  console.log(sectors[i].name);
      //};
      res.json(sectors);
    });
  });  

// on routes that end in /clients
// ----------------------------------------------------
router.route('/clients')

  // create a client (accessed at POST http://localhost:8080/api/clients
  .post(function(req, res) {
      
      con.query('INSERT INTO clients SET ?', req.body, function(err,result){
        if(err) 
	        res.json(err);
          console.log('Last insert ID:', result.insertId);
        res.json(result);
      });
  })

  // get all the clients (accessed at GET http://localhost:8080/api/clients)
  .get(function(req, res) {
    var sql = "SELECT c.*, cs.name as sector_name, u.name as account_manager_name FROM clients as c \
      LEFT JOIN company_sectors as cs ON c.sector_id = cs.id \
      LEFT JOIN users as u ON c.account_manager_id = u.id" ;
    con.query(sql,function(err,clients){
      if(err) 
        res.send(err);
		  for (var i = 0; i < clients.length; i++) {
  		  console.log(clients[i].name);
		  };
      res.json(clients);
    });
  });

// on routes that end in /client/:id
// ----------------------------------------------------
router.route('/clients/:id')

  // get the client with that id (accessed at GET http://localhost:8080/api/clients/:id)
  .get(function(req, res) {

		con.query('SELECT * FROM clients where id=?',req.params.id ,function(err,clients){
      if(err)
        res.send(err);
      res.json(clients);
    });
  })

  // update the client with this id (accessed at PUT http://localhost:8080/api/clients/:id)
  .put(function(req, res) {  

    var client = req.body;

	  con.query('UPDATE clients SET \
      company_name=?, \
      contact_name=?, \
      contact_phone=?, \
      contact_email=?, \
      account_manager_id=?, \
      notes=?, \
      sector_id=?\
      Where ID = ?',	
        [ client.company_name, 
          client.contact_name,
          client. contact_phone,
          client.contact_email,
          client.account_manager_id,
          client.notes,
          client.sector_id,
          req.params.id], function (err, result) {
      if (err) 
        res.send(err);
		  //console.log('Changed ' + result.changedRows + ' rows');
      res.json({ message: 'Client updated!' });
  	});
  })

  // delete the client with this id (accessed at DELETE http://localhost:8080/api/clients/:id)
  .delete(function(req, res) {
	  con.query('DELETE FROM clients WHERE id = ?', [req.params.id], function (err, result) {
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
