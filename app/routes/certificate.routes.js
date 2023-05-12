module.exports = (app) => {
  const certificate = require("../controllers/certificate.controller.js");

  var router = require("express").Router();

  // Create a new certificate
  router.post("/", certificate.create);

  // Retrieve all certificates
  router.get("/", certificate.findAll);

  // Retrieve a single certificate with id
  router.get("/:id", certificate.findOne);

  // Update a certificate with id
  router.put("/:id", certificate.update);

  // Delete a certificate with id
  router.delete("/:id", certificate.delete);

  // Delete all certificates
  router.delete("/", certificate.deleteAll);

  app.use("/api/certificates", router);
};
