module.exports = (app) => {
  const cashback = require("../controllers/cashback.controller.js");

  var router = require("express").Router();

  // Create a new cashback
  router.post("/", cashback.create);

  // Retrieve all cashbacks
  router.get("/", cashback.findAll);

  // Retrieve a single cashback with id
  router.get("/:id", cashback.findOne);

  // Update a cashback with id
  router.put("/:id", cashback.update);

  // Delete a cashback with id
  router.delete("/:id", cashback.delete);

  // Delete all cashbacks
  router.delete("/", cashback.deleteAll);

  app.use("/api/cashbacks", router);
};
