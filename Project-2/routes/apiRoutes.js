/* eslint-disable indent */
var db = require("../models");

module.exports = function(app) {
  // *** board api routes *** //

  // Get all boards

  app.get("/api/boards/:userid", function(req, res) {
    db.Board.findAll({
      where: {
        UserId: req.params.userid
      }
    }).then(function(dbBoard) {
      res.json(dbBoard);
    });
  });

  // Get a board by id and show the boards goals

  app.get("/api/board/:id", function(req, res) {
    db.Board.findOne({
      where: {
        id: req.params.id,
        include: [db.Goals]
      }
    }).then(function(dbBoard) {
      res.json(dbBoard);
    });
  });

  // Create a new board for specific user

  app.post("/api/boards/:userid", function(req, res) {
    db.Board.create(req.body).then(function(dbBoard) {
      res.json(dbBoard);
    });
  });

  // Delete a board by id

  app.delete("/api/boards/:id", function(req, res) {
    db.Board.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbBoard) {
      res.json(dbBoard);
    });
  });

  // *** Goal api routes ** //

  // Get all goals for a specific board
  app.get("/api/goals/:boardID", function(req, res) {
    db.Goals.findAll({
      where: {
        BoardId: req.params.boardID
      }
    }).then(function(dbGoals) {
      res.json(dbGoals);
    });
  });

  // create a new goal

  app.post("/api/goals/:boardID", function(req, res) {
    db.Goals.create(req.body).then(function(dbGoals) {
      res.json(dbGoals);
    });
  });

  // delete a goal by id

  app.delete("/api/goals/:id", function(req, res) {
    db.Goals.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbGoals) {
      res.json(dbGoals);
    });
  });

  // update a goal

  app.put("/api/goals/:id", function(req, res) {
    db.Goals.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function(dbGoals) {
      res.json(dbGoals);
    });
  });

  // *** User API routes ** //

  app.get("/api/createuser/:name", function(req, res) {
    db.User.findOne({
      where: {
        name: req.params.name
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/user/:name", function(req, res) {
    db.User.findOne({
      where: {
        name: req.params.name
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/user", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });
};
