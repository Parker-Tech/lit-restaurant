// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

var customers = [{
  routeName: "justinp",
  name: "Justin Parker",
  phoneNumber: "900-200-3000",
  email: "whatever@gmail.com"
}];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html")); //put our html pages in here
});

app.get("/reservations", function (req, res) {
  res.sendFile(path.join(__dirname, "/table.html"));
});

// Displays all characters
app.get("/api/customers", function (req, res) {
  return res.json(customers);
});

// Displays a single customer, or returns false
app.get("/api/customers/:customer", function (req, res) {
  var chosen = req.params.customer;

  console.log(chosen);

  for (var i = 0; i < customers.length; i++) {
    if (chosen === customers[i].routeName) {
      return res.json(customers[i]);
    }
  }
  return res.json(false);
});
app.post("/api/customers", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newCustomer = req.body;
  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newCustomer.routeName = newCustomer.name.replace(/\s+/g, "").toLowerCase();

  console.log(newCustomer);

  characters.push(newCustomer);

  res.json(newCustomer);
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
