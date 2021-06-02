const sql = require("./db.js");

const MarkMaster = function (markMaster) {
   this.studentId = markMaster.studentId;
   this.lessonId = markMaster.lessonId;
   this.masterId = markMaster.masterId;
   this.markType = markMaster.markType;
   this.degree = markMaster.degree;
   this.examType = markMaster.examType;
   this.status = markMaster.status;
};

MarkMaster.create = (newMarkMaster, result) => {
   sql.query("INSERT INTO markMaster SET ?", newMarkMaster, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created markMaster: ", {
         id: res.insertId,
         ...newMarkMaster,
      });
      result(null, { id: res.insertId, ...newMarkMaster });
   });
};

MarkMaster.getAll = (result) => {
   sql.query("SELECT * FROM markMaster", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("markMasters: ", res);
      result(null, res);
   });
};


MarkMaster.checkDegree = (data , result) =>{
   sql.query(`SELECT * FROM markMaster Where studentId = ${data.studentId} AND lessonId = ${data.lessonId} AND markType = '${data.markType}' AND masterId = ${data.masterId}`, (err , row) =>{
      if (row.length == 0) {
         console.log("not found");
         result('not found', null);
         return;
      }else{
         result(null , row)
      }
   })
}

MarkMaster.getQuery = (sqlQuery, result) => {
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

MarkMaster.findById = (markMasterId, result) => {
   sql.query(
      `SELECT * FROM markMaster WHERE id = ${markMasterId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found markMaster: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

MarkMaster.updateById = (idMarkMaster, markMaster, result) => {
   sql.query(
      "UPDATE markMaster SET ? WHERE idMarkMaster = ?",
      [markMaster, idMarkMaster],
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

         console.log("updated markMaster: ", {
            id: idMarkMaster,
            ...markMaster,
         });
         result(null, { id: idMarkMaster, ...markMaster });
      }
   );
};

MarkMaster.remove = (idMarkMaster, result) => {
   sql.query(
      "DELETE FROM markMaster WHERE idMarkMaster = ?",
      idMarkMaster,
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

         console.log("deleted markMaster with id: ", idMarkMaster);
         result(null, res);
      }
   );
};

module.exports = MarkMaster;
