const sql = require("./db.js");

const MasterSheet = function (masterSheet) {
   this.masterKey = masterSheet.masterKey;
   this.note = masterSheet.note;
};

MasterSheet.create = (newMaster, result) => {
   sql.query("INSERT INTO mastersheet SET ?", newMaster, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created master: ", { idMaster: res.insertId, ...newMaster });
      result(null, { idMaster: res.insertId, ...newMaster });
   });
};

MasterSheet.getAll = (result) => {
   sql.query("SELECT * FROM mastersheet", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      result(null, res);
   });
};

MasterSheet.checkKey = (masterKey, result) => {
   sql.query(
      `SELECT * FROM mastersheet WHERE masterKey = '${masterKey}'`,
      (err, res) => {
         if (err) {
            result(err, null);
            return;
         }
         result(null, res);
      }
   );
};

MasterSheet.findById = (idMaster, result) => {
   sql.query(
      `SELECT * FROM mastersheet WHERE idMaster = ${idMaster}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found master: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

MasterSheet.updateById = (idMaster, note, result) => {
   sql.query(
      `UPDATE mastersheet SET note = '${note}' WHERE idMaster = ${idMaster}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
         }

         console.log("updated master: ", { idMaster: idMaster, note });
         result(null, { idMaster: idMaster, note });
      }
   );
};

MasterSheet.remove = (idMaster, result) => {
   sql.query(
      "DELETE FROM mastersheet WHERE idMaster = ?",
      idMaster,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
         }

         console.log("deleted master with id: ", id);
         result(null, res);
      }
   );
};

module.exports = MasterSheet;
