// Required npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");

// Global variables
var itemSelected;
var newStockNum;
var product_name;
var addedStock;

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
var query2 = "SELECT * FROM products where stock_quantity < 5";

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
        var managerChoice = answer.managerChoice;
        if (managerChoice === "View Products for Sale") {
            console.log("\nViewing Products Currently for Sale...\nTo return to the main menu, please restart application.\n");
            showProducts();
            connection.end();
        } else if (managerChoice === "View Low Inventory") {
            console.log("\nViewing Products Low ( < 5 left ) in Inventory...\nTo return to the main menu, please restart application.\n");
            showLowInventory();
        } else if (managerChoice === "Add to Inventory") {
            console.log("\nRunning Add to Inventory Function...\nTo return to the main menu, please restart application.\n");
            showProducts();
            addToInventory();
        } else if (managerChoice === "Add New Product") {
            console.log("\nRunning Add New Product Function...\nTo return to the main menu, please restart application.\n");
            addNewProduct();
        };
    });
};

// Function to View Products for sale (itemid, name, prices, quantities) 
function showProducts () {
    connection.query(query, function(err, results) {
        if (err) {
            throw err;
        };
        console.log("\nID - Product Name: Price - # Left In Stock\n");
        results.forEach(element =>  {
            var item_id = element.item_id;
            var product_name = element.product_name;
            var price = element.price;
            var stock = element.stock_quantity;
            console.log(`${item_id} - ${product_name}: $${price} - ${stock} Left In Stock`)
        });
    });
};

// Function to View Low Inventory (list all items where quantity < 5)
function showLowInventory () {
    connection.query(query2, function(err, results) {
        if (err) {
            throw err;
        };
        console.log("\nID - Product Name: Price - # Left In Stock\n");
        results.forEach(element =>  {
            var item_id = element.item_id;
            var product_name = element.product_name;
            var price = element.price;
            var stock = element.stock_quantity;
            console.log(`${item_id} - ${product_name}: $${price} - ${stock} Left In Stock`)
        });
    });
    connection.end();
    
};

// Function to Add to Inventory (display prompt(inquirer) to let manager "add more" of any item in store)
function addToInventory () {
    inquirer.prompt([
        {
            type: "input",
            name: "itemSelected",
            message: "Please type the item id you'd like to add more inventory to."
        },
        {
            type: "input",
            name: "quantity",
            message: "Please type the quantity of units you would like to add."
        }
    ]).then(function (answer) {
        itemSelected = Number(answer.itemSelected);
        addedStock = Number(answer.quantity);

        connection.query(`SELECT * FROM products where item_id = ${itemSelected}`, function(err, results) {
            if (err) {
                throw err;
            };
            results.forEach(element =>  {
                product_name = element.product_name;
                newStockNum = element.stock_quantity + addedStock;
            });
            updateQuantity();
        });
    });
};

// Function to Update the MySQL db with the new quantity
function updateQuantity () {
    connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: newStockNum
            },
            {
                item_id: itemSelected
            }
        ], function (err, results) {
            if (err) {
                throw err;
            };
            console.log(`\n${product_name} received ${addedStock} units for a total of ${newStockNum}`);
        }
    );
    connection.end();
};

// Constructor function to create new product
function Product (name, price, department, stock) {
    this.name = name,
    this.price = price,
    this.department = department,
    this.stock = stock
};

// Function to Add New Product from constructor (to store / mysql db)
function addNewProduct () {
    inquirer.prompt([
        {
            type: "input",
            name: "newName",
            message: "What is the new product's name?"
        },
        {
            type: "input",
            name: "newPrice",
            message: "What is the price of the new item?"
        },
        {
            type: "input",
            name: "newDepartment",
            message: "What department does this new item belong to?"
        },
        {
            type: "input",
            name: "newStock",
            message: "How many units do we currently have?"
        }
    ]).then(function (answer) {
        var newProduct = new Product(answer.newName, Number(answer.newPrice), answer.newDepartment, Number(answer.newStock));
        // Test
        // console.log(newProduct);

        connection.query("INSERT INTO products SET ?", 
        {
            product_name: newProduct.name,
            department_name: newProduct.department,
            price: newProduct.price,
            stock_quantity: newProduct.stock
        }, 
            function (err, results) {
                if (err) {
                    throw err;
                };
                console.log(`Added ${newProduct.name} to the inventory.`);
            }
        );
        connection.end();
    });
};
