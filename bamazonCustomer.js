var mysql = require("mysql");

// Connect to MySQL DB
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Lollersk8!",
    database: "bamazon"
});

// Queries
var query = "SELECT * FROM products";

// Connect & Query
connection.connect(function(err) {
    if (err) {
        throw err;
    } else {
        console.log("Welcome to Bamazon!");
        
    }
});

connection.query(query, function(err, results) {
    for (var i = 0; i < results.length; i++) {
      console.log(`${results[i].item_id} - ${results[i].product_name}: $${results[i].price}`);
    }
});

// ask for id of which one to buy (inquirer)

    // ask for how many to buy