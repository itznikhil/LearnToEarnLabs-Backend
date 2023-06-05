module.exports = (app) => {
    const contacts = require("../controllers/contact.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Query
    router.post("/", contacts.create);
  
    // Retrieve all Querys
    router.get("/", contacts.findAll);
  
    // Retrieve a single Query with id
    router.get("/:id", contacts.findOne);
  
    // Update a Query with id
    router.put("/:id", contacts.update);
  
    // Delete a Query with id
    router.delete("/:id", contacts.delete);
  
    // Delete all Querys
    router.delete("/", contacts.deleteAll);
  
    app.use("/api/contacts", router);
  };
  