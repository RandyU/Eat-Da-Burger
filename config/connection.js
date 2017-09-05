// Required dependencies
var mysql = require('mysql');

// Create MySQL connection
var connection;

if (process.env.BurgerDB_URL) {
	// DB is BurgerDB on Heroku
	connection = mysql.createConnection(process.env.BurgerDB_URL);
} else {
	// Local DB
	connection = mysql.createConnection({
		port: 3000,
		host: 'localhost',
		user: 'root',
		password: 'acme2263',
		database: 'burgers_db'
	});
};

// Connection to MySQL
connection.connect(function(err) {
  if (err) {
    console.error('ERROR: MySQL connection error -- ' + err.stack + '\n\n');
    return;
  }
  console.log('Connected to MySQL database as id ' + connection.threadId + '\n\n');
});

module.exports = connection;
