const sql = require("./db.js");

const PassMark = function (passMark) {
   this.studentId = passMark.studentId;
   this.lessonId = passMark.lessonId;
   this.coHeadId = passMark.coHeadId;
   this.theoreticalMark = passMark.theoreticalMark;
   this.markDate = passMark.markDate;
   this.practicalMark = passMark.practicalMark;
   this.finalMark = passMark.finalMark;
   this.final2 = passMark.final2;
   this.lift = passMark.lift;
   this.status = passMark.status;
   this.status2 = passMark.status2;
};

PassMark.create = (newPassMark, result) => {
   sql.query("INSERT INTO passMarks SET ?", newPassMark, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created passMark: ", {
         idPassMark: res.insertId,
         ...newPassMark,
      });
      result(null, { idPassMark: res.insertId, ...newPassMark });
   });
};

PassMark.getAll = (sqlQuery, result) => {
   sql.query(
      `SELECT *,(theoreticalMark + practicalMark + finalMark ) AS finalMark1,IF(final2 =0 ,0,(theoreticalMark + practicalMark + final2 )) AS finalMark2, (SELECT name FROM student WHERE id = passMarks.studentId) AS studentName , (SELECT name FROM lesson WHERE id = passMarks.lessonId) AS lessonName FROM passMarks WHERE 1=1 ${sqlQuery}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         result(null, res);
      }
   );
};

PassMark.getLiftAll = (sqlQuery, result) => {
   sql.query(
      `SELECT *, (theoreticalMark + practicalMark + finalMark + lift ) As finalMark1 ,(theoreticalMark + practicalMark + final2 + lift ) As finalMark2 , (theoreticalMark2 + practicalMark2 + finalMark + lift ) As aFindMark ,  (theoreticalMark2 + practicalMark2 + final2 + lift ) As aFinalMark2 FROM passMarks WHERE (theoreticalMark + practicalMark + finalMark ) < 50 AND (theoreticalMark + practicalMark + final2 ) < 50 ${sqlQuery} ORDER BY finalMark1`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         result(null, res);
      }
   );
};

PassMark.findById = (idPassMark, result) => {
   sql.query(`SELECT * FROM passMarks WHERE id = ${idPassMark}`, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      if (res.length) {
         console.log("found user: ", res[0]);
         result(null, res[0]);
         return;
      }

      result({ kind: "not_found" }, null);
   });
};

PassMark.updateById = (markData, result) => {
   sql.query(
      `UPDATE passMarks SET studentId = ${markData.studentId} , lessonId = ${markData.lessonId} , coHeadId = ${markData.coHeadId} , theoreticalMark = ${markData.theoreticalMark} , practicalMark = ${markData.practicalMark} , finalMark = ${markData.finalMark} , final2 = ${markData.final2} ,status = ${markData.status}, status2 = ${markData.status2}  WHERE idPassMark = ${markData.idPassMark}`,
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

         console.log("updated passMark: ", { ...markData });
         result(null, { ...markData });
      }
   );
};

PassMark.updateLiftData = (data, result) => {
   sql.query(
      `UPDATE passMarks SET lift = ${data.lift} WHERE idMark = ${data.idMark}`,
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

         console.log("updated mark: ", { ...data });
         result(null, { ...data });
      }
   );
};

PassMark.updateStatus = (data, result) => {
   sql.query(
      `UPDATE passMarks SET status = ${data.status} WHERE idPassMark = ${data.idMark}`,
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

         console.log("updated passMark: ", { ...data });
         result(null, { ...data });
      }
   );
};

PassMark.remove = (id, result) => {
   sql.query("DELETE FROM passMarks WHERE id = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted user with id: ", id);
      result(null, res);
   });
};

module.exports = PassMark;
