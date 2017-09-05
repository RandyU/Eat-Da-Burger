var connection = require ('./connection.js');

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    arr.push(key + "=" + ob[key]);
  }

  return arr.toString();
}

// creates ORM object for sql queries
var orm = {
  // function to return table entries
  selectAll: function(tableInput, cb) {
    
    var queryString = "SELECT * FROM " + tableInput + ";";

    // perform the database query
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      // callback to return results
      cb(result);
    });
  },

  // insert a single table entry function
  insertOne: function(table, cols, vals, cb) {
    
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },

  updateOne: function(table, objColVals, condition, cb) { Construct the query string that updates a single entry in the target table
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    // console.log(queryString);

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};
module.exports = orm;