// Required npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");

// Global variables
var itemSelected;
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

// Connect & Welcome Message
connection.connect(function(err) {
    if (err) {
        throw err;
    } else {
        console.log("\n================================");
        console.log("Welcome to Bamazon Manager Mode!");
        console.log("================================");
        startManager();
    }
});

// Function to list a set of menu items (inquirer)
function startManager() {
    inquirer.prompt({
        type: "list",
        name: "managerChoice",
        message: "Hello Manager! - Choose from one of the following options",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }).then(function (answer) {

    });
};


    // View Products for sale (itemid, name, prices, quantities)
    // View Low Inventory (list all items where quantity < 5)
    // Add to Inventory (display prompt(inquirer) to let manager "add more" of any item in store)
    // Add New Product (add brand new product to store)
