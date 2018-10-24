// NPM PACKAGES
var mysql = require("mysql");
var inquirer = require("inquirer");

// CONNECT TO THE DATABASE
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;

    // AFTER CONNECTION IS MADE, DISPLAY WHAT YOU HAVE FOR SALE
    showStock();
});

// -------------------------------SHOW STOCK-------------------------------
function showStock() {
    // SELECT PRODUCTS TABLE FROM BAMAZON
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("------------------------------------------------------------------------");
        console.log("---------------------------WELCOME TO BAMAZON---------------------------");
        console.log("------------------------------------------------------------------------");

        // USE A FOR LOOP TO GATHER THE INFORMATION FOR EACH PRODUCT
        for (i = 0; i < res.length; i++) {
            var item_id = res[i].item_id;
            var product_name = res[i].product_name;
            var department_name = res[i].department_name;
            var price = res[i].price;
            var in_stock = res[i].in_stock;

            // CONSOLE LOG THE INFORMATION ON A SINGLE LINE
            console.log(item_id + " | " + department_name + " | " + product_name + " | " + price + " | " + in_stock);
            console.log("------------------------------------------------------------------------");
        }

        // AFTER DISPLAYING INFORMATION, BEGIN PURCHASE PROCESS
        buyItem();
    });
}
// -------------------------------BUY ITEM-------------------------------
function buyItem() {
    connection.query("SELECT * FROM products", function (err, res) {
        console.log("------------------------------------------------------------------------");
        inquirer
            // USER CHOOSES ITEM AND QUANTITY
            .prompt([{
                name: "itemPrompt",
                type: "input",
                message: "Enter the ID number of the item you want to buy.",
                validate: function (value) {
                    if (isNaN(value) == false) {
                        return true;
                    } else {
                        return false;
                    }
                }
                }, {
                name: "quantityPrompt",
                type: "input",
                message: "How many do you want?",
                    validate: function (value) {
                        if (isNaN(value) == false) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            ])
            .then(function(answer) {
                // CREATE VARIABLES FOR USER INPUTS AND CALCULATE NEW QUANTITIES
                var chosenID = answer.itemPrompt - 1;
                var chosenProduct = res[chosenID];
                var chosenQuantity = answer.quantityPrompt;
                var newQuantity;
                var total;
                // MAKE SURE THERE IS ENOUGH IN STOCK
                if (chosenQuantity <= res[chosenID].in_stock) {
                    var newQuantity = res[chosenID].in_stock - chosenQuantity;
                    var total = res[chosenID].price * chosenQuantity;
                    console.log("You purchased " + chosenQuantity + "x " + res[chosenID].product_name);
                    console.log("Your purchase total is " + total);
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                in_stock: newQuantity
                            },
                            {
                                item_id: answer.itemPrompt
                            }
                        ],
                    );
                    inquirer
                        .prompt({
                            name: "postOrBid",                            type: "rawlist",
                            message: "Would you like to buy something else?",
                            choices: ["YES", "NO"]
                        })
                        .then(function (answer) {
                            if (answer.postOrBid.toUpperCase() === "YES") {
                                showStock();
                            } else {
                                console.log("------------------------------------------------------------------------");
                                console.log("Thank you for shopping at Bamazon!");
                                console.log("------------------------------------------------------------------------");
                                process.exit();
                            }
                        });
                } else {
                    console.log("------------------------------------------------------------------------");
                    console.log('Sorry, we have an insufficient number of those in stock.');
                    buyItem();
                }
            })
    });
    
}

// ------------------------------------------------------------------------