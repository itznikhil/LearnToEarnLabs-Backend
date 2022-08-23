module.exports = (app) => {
  const queries = require("../controllers/query.controller.js");

  var router = require("express").Router();

  // Create a new Query
  router.post("/", queries.create);

  // Retrieve all Querys
  router.get("/", queries.findAll);

  // Retrieve a single Query with id
  router.get("/:id", queries.findOne);

  // Update a Query with id
  router.put("/:id", queries.update);

  // Delete a Query with id
  router.delete("/:id", queries.delete);

  // Delete all Querys
  router.delete("/", queries.deleteAll);

  app.use("/api/queries", router);
};
