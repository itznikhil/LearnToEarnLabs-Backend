const sql = require("./db.js");

// constructor
const Cashback = function (cashback) {
  this.receiptNo = cashback.receiptNo;
  this.enrollmentNo = cashback.enrollmentNo;
  this.accountNo = cashback.accountNo;
  this.ifscCode = cashback.ifscCode;
  this.datetime = cashback.datetime;
};

Cashback.create = (newCashback, result) => {
  sql.query("INSERT INTO cashbacks SET ?", newCashback, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created cashback: ", { id: res.insertId, ...newCashback });
    result(null, { id: res.insertId, ...newCashback });
  });
};

Cashback.findById = (id, result) => {
  sql.query(`SELECT * FROM cashbacks WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found cashback: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found cashback with the id
    result({ kind: "not_found" }, null);
  });
};

Cashback.getAll = (enrollmentNo, result) => {
  let query = "SELECT * FROM cashbacks";

  if (enrollmentNo) {
    query += ` WHERE enrollmentNo LIKE '%${enrollmentNo}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("cashbacks: ", res);
    result(null, res);
  });
};

Cashback.updateById = (id, cashback, result) => {
  sql.query(
    "UPDATE cashbacks SET accountNo = ? WHERE id = ?",
    [cashback.accountNo, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found cashback with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated cashback: ", { id: id, ...cashback });
      result(null, { id: id, ...cashback });
    }
  );
};

Cashback.remove = (id, result) => {
  sql.query("DELETE FROM cashbacks WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found cashback with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted cashbacks with id: ", id);
    result(null, res);
  });
};

Cashback.removeAll = (result) => {
  sql.query("DELETE FROM cashbacks", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} cashbacks`);
    result(null, res);
  });
};

module.exports = Cashback;
