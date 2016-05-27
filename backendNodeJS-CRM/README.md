
1. Connect to DB

- install node-mysql
(from package.json run npm install)

- set DB in MySQL

CREATE TABLE employees (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(50),
  location varchar(50),
  PRIMARY KEY (id)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

INSERT INTO employees (id, name, location) VALUES
(1, 'Jasmine', 'Australia'),
(2, 'Jay', 'India'),
(3, 'Jim', 'Germany'),
(4, 'Lesley', 'Scotland');

- connect do DB: run node app.js

- watch changes: grunt watch

===============================================================

2. REST with NodeJS

- dependencies: "body-parser": "~1.0.1"

- start server: node server.js 

- test API w Chromie: Postman
