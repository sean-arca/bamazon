// Required npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");

// Global Variables
var itemSelected;
var quantity;
var newStockNum;

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

// Connect & Welcome Message
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

// Function to Show Products 
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
            // for (var i = 0; i < results.length; i++) {
            // console.log(`${results.item_id} - ${results.product_name}: $${results.price}`)};
        });

        buyItem();
    });
};

showProducts();


// Function to ask for ID of which item to buy (inquirer)
function buyItem () {
    inquirer.prompt([
        {
            type:"input",
            name:"itemSelected",
            message:"Please type an item id to purchase."
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
        
        checkItemStock();
    });
};

// Function to check database if item is in stock
function checkItemStock () {
    connection.query(`SELECT stock_quantity, price FROM products WHERE item_id=${itemSelected}`, function(err, results) {
        if (err) {
            throw err
        };
        var stock_quantity = results[0].stock_quantity;
        var price = results[0].price;

        //Test
        // console.log(`${itemSelected} @ $${price} - ${stock_quantity} units in stock`);

        if (quantity < stock_quantity) {
            newStockNum = stock_quantity - quantity;
            var totalPrice = price * quantity;
            console.log(`\nYou're in luck! We have that item in stock. The total will be $${totalPrice} for ${quantity} units.\n`)
            updateQuantity();
            connection.end();
            return;
        } else {
            console.log(`\nSorry! We have none left in stock. Returning you to the product list.\n`);
            showProducts();
            return;
        }
    });
};

// Function to update the quantity in the MySQL db
function updateQuantity () {

};