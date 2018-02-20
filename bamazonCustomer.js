// Required npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");

// Global Variables
var itemSelected;
var quantity;

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

        console.log("Please type an item id to purchase.")
    });
};

showProducts();


// ask for id of which one to buy (inquirer)
function buyItem() {
    inquirer.prompt([
        {
            type:"input",
            name:"itemSelected",
            message:"Item ID entered:"
        },
        {
            type:"input",
            name:"quantity",
            message:"How many would you like to purchase?"
        }
    ]).then(function (results) {
        itemSelected = results.itemSelected;
        quantity = Number(results.quantity);
        
        if (itemSelected > 10) {
            console.log("Invalid item, please select a new item.")
            buyItem();
        }
    });
};

buyItem();