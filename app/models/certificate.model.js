const sql = require("./db.js");

// constructor
const Certificate = function (certificate) {
  this.certificateCode = certificate.certificateCode;
  this.completionDate = certificate.completionDate;
  this.enrollmentNo = certificate.enrollmentNo;
  this.candidateName = certificate.candidateName;
  this.datetime = certificate.datetime;
  this.title = certificate.title;
  this.duration = certificate.duration;
};

Certificate.create = (newCertificate, result) => {
  sql.query("INSERT INTO certificates SET ?", newCertificate, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created certificate: ", { id: res.insertId, ...newCertificate });
    result(null, { id: res.insertId, ...newCertificate });
  });
};

Certificate.findById = (id, result) => {
  sql.query(`SELECT * FROM certificates WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found certificate: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found certificate with the id
    result({ kind: "not_found" }, null);
  });
};

Certificate.getAll = (enrollmentNo, result) => {
  let query = "SELECT * FROM certificates";

  if (enrollmentNo) {
    query += ` WHERE enrollmentNo LIKE '%${enrollmentNo}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("certificates: ", res);
    result(null, res);
  });
};

Certificate.updateById = (id, certificate, result) => {
  sql.query(
    "UPDATE certificates SET title = ? WHERE id = ?",
    [certificate.title, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found certificate with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated certificate: ", { id: id, ...certificate });
      result(null, { id: id, ...certificate });
    }
  );
};

Certificate.remove = (id, result) => {
  sql.query("DELETE FROM certificates WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found certificate with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted certificates with id: ", id);
    result(null, res);
  });
};

Certificate.removeAll = (result) => {
  sql.query("DELETE FROM certificates", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} certificates`);
    result(null, res);
  });
};

module.exports = Certificate;
