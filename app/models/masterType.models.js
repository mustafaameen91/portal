const sql = require("./db.js");

const MasterType = function (masterType) {
   this.typeName = masterType.typeName;
};

MasterType.create = (newMasterType, result) => {
   sql.query("INSERT INTO masterType SET ?", newMasterType, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created masterType: ", {
         id: res.insertId,
         ...newMasterType,
      });
      result(null, { id: res.insertId, ...newMasterType });
   });
};

MasterType.getAll = (result) => {
   sql.query("SELECT * FROM masterType", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("masterType: ", res);
      result(null, res);
   });
};

MasterType.getQuery = (sqlQuery, result) => {
   sql.query(`${sqlQuery}`, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("find: ", res);
      result(null, res);
   });
};

MasterType.findById = (masterTypeId, result) => {
   sql.query(
      `SELECT * FROM masterType WHERE idMasterType = ${masterTypeId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found masterType: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

MasterType.updateById = (id, masterType, result) => {
   sql.query(
      "UPDATE masterType SET ? WHERE idMasterType = ?",
      [masterType, id],
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

         console.log("updated masterType: ", { id: id, ...masterType });
         result(null, { id: id, ...masterType });
      }
   );
};

MasterType.remove = (id, result) => {
   sql.query(
      "DELETE FROM masterType WHERE idMasterType = ?",
      id,
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

         console.log("deleted masterType with id: ", id);
         result(null, res);
      }
   );
};

module.exports = MasterType;
