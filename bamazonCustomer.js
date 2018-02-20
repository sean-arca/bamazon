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
        console.log("\n===========================================");
        console.log("Welcome to Bamazon! Home of the best Warez!");
        console.log("===========================================");
        console.log("\nID - Product Name: Price\n");
    }
});

function showProducts () {
    connection.query(query, function(err, results) {
        if (err) {
            throw err;
        };

        results.forEach(element =>  {
            var item_id = element.item_id;
            var product_name = element.product_name;
            var price = element.price;
            console.log(`${item_id} - ${product_name}: $${price}`)

            // Testing the old ways
            // (var i = 0; i < results.length; i++)
            // console.log(`${results.item_id} - ${results.product_name}: $${results.price}`);
        });
    });
};

showProducts();


// ask for id of which one to buy (inquirer)

    // ask for how many to buy