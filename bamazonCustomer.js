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
    connection.query('SELECT * FROM products', function (err, res) {
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
    console.log("------------------------------------------------------------------------")
    console.log("What do you want to buy?");
}

// ------------------------------------------------------------------------