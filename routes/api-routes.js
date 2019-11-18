// *****************************************************************************
// **** api-routes.js - this file offers a set of routes for displaying and
// saving data to the db
// ******************************************************************************
// *** Dependencies

// Requiring our models
var db = require("../models");

// Routes =============================================================
module.exports = function(app) {

  // GET route for getting all of the burgers
  app.get("/api/burgers", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Burger.findAll({}).then(function(dbBurger) {
      // We have access to the burgers as an argument inside of the callback function
      res.json(dbBurger);
    });

  });

  // POST route for saving a new burger
  app.post("/api/burgers", function(req, res) {
    // create takes an argument of an object describing the item we want to insert
    // into our table. In this case we just we pass in an object with a burgerName and
    // devoured property
    db.Burger.create({
      burgerName: req.body.burgerName,
      devoured: req.body.devoured
    }).then(function(dbBurger) {
      // We have access to the new burger as an argument inside of the callback function
      res.json(dbBurger);
    });

  });

  // PUT route for updating burgers. We can get the updated burger data from req.body
  app.put("/api/burgers", function(req, res) {
    // Update takes in two arguments, an object describing the properties we want to update,
    // and another "where" object describing the burgers we want to update
    db.Burger.update({
      burgerName: req.body.burgerName,
      devoured: req.body.devoured
    }, {
      where: {
        id: req.body.id
      }
    })
      .then(function(dbBurger) {
        res.json(dbBurger);
      });

  });
};
