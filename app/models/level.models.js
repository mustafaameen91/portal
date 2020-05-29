const sql = require("./db.js");

const Level = function (level) {
   this.sectionId = level.sectionId;
   this.level = level.level;
   this.type = level.type;
   this.year = level.year;
};

Level.create = (newLevel, result) => {
   sql.query("INSERT INTO level SET ?", newLevel, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created level: ", { id: res.insertId, ...newLevel });
      result(null, { id: res.insertId, ...newLevel });
   });
};

Level.getAll = (sqlQuery, result) => {
   sql.query(`SELECT * FROM level WHERE 1=1 ${sqlQuery}`, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("level: ", res);
      result(null, res);
   });
};

Level.foundLevel = (levelData, result) => {
   sql.query(
      `SELECT * FROM level WHERE sectionId = ${levelData.sectionId} AND level = ${levelData.level} AND year = '${levelData.year}'`,
      (err, res) => {
         if (err) {
            result(err, null);
            return;
         }
         if (res.length) {
            console.log("found level: ", res[0]);
            sql.query(
               "UPDATE level SET ? WHERE id = ?",
               [levelData, res[0].id],
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

                  result(null, [levelData]);
               }
            );
         } else {
            result(null, []);
         }
      }
   );
};

Level.findById = (levelId, result) => {
   sql.query(`SELECT * FROM level WHERE id = ${levelId}`, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      if (res.length) {
         console.log("found level: ", res[0]);
         result(null, res[0]);
         return;
      }

      result({ kind: "not_found" }, null);
   });
};

Level.updateById = (id, level, result) => {
   sql.query("UPDATE level SET ? WHERE id = ?", [level, id], (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("updated level: ", { id: id, ...level });
      result(null, { id: id, ...level });
   });
};

Level.remove = (id, result) => {
   sql.query("DELETE FROM level WHERE id = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted level with id: ", id);
      result(null, res);
   });
};

module.exports = Level;
