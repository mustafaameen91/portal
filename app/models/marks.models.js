const sql = require("./db.js");

const Mark = function (mark) {
   this.studentId = mark.studentId;
   this.lessonId = mark.lessonId;
   this.coHeadId = mark.coHeadId;
   this.theoreticalMark = mark.theoreticalMark;
   this.markDate = mark.markDate;
   this.practicalMark = mark.practicalMark;
   this.finalMark = mark.finalMark;
   this.final2 = mark.final2;
   this.lift = mark.lift;
   this.status = mark.status;
};

Mark.create = (newMark, result) => {
   sql.query("INSERT INTO marks SET ?", newMark, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created mark: ", { id: res.insertId, ...newMark });
      result(null, { idMark: res.insertId, ...newMark });
   });
};

Mark.getAll = (sqlQuery, result) => {
   sql.query(
      `SELECT *,(theoreticalMark + practicalMark + finalMark ) AS finalMark1,IF(final2 =0 ,0,(theoreticalMark + practicalMark + final2 )) AS finalMark2 , (SELECT name FROM student WHERE id = marks.studentId) AS studentName , (SELECT name FROM lesson WHERE id = marks.lessonId) AS lessonName FROM marks WHERE 1=1 ${sqlQuery}`,
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

Mark.getLiftAll = (sqlQuery, result) => {
   sql.query(
      `SELECT *, (theoreticalMark + practicalMark + finalMark + lift ) As finalMark1 ,(theoreticalMark + practicalMark + final2 + lift ) As finalMark2 FROM marks WHERE (theoreticalMark + practicalMark + finalMark ) < 50 AND (theoreticalMark + practicalMark + final2 ) < 50 ${sqlQuery} ORDER BY finalMark1`,
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

Mark.findById = (userId, result) => {
   sql.query(`SELECT * FROM user WHERE id = ${userId}`, (err, res) => {
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

Mark.updateById = (markData, result) => {
   sql.query(
      `UPDATE marks SET studentId = ${markData.studentId} , lessonId = ${markData.lessonId} , coHeadId = ${markData.coHeadId} , theoreticalMark = ${markData.theoreticalMark} , practicalMark = ${markData.practicalMark} , finalMark = ${markData.finalMark} , final2 = ${markData.final2}  WHERE idMark = ${markData.idMark}`,
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

         console.log("updated mark: ", { ...markData });
         result(null, { ...markData });
      }
   );
};

Mark.updateLiftData = (data, result) => {
   sql.query(
      `UPDATE marks SET lift = ${data.lift} WHERE idMark = ${data.idMark}`,
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

Mark.updateStatus = (data, result) => {
   sql.query(
      `UPDATE marks SET status = ${data.status} WHERE idMark = ${data.idMark}`,
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

Mark.remove = (id, result) => {
   sql.query("DELETE FROM user WHERE id = ?", id, (err, res) => {
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

module.exports = Mark;
