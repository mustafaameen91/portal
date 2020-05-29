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
   this.status2 = mark.status2;
   this.practicalMark2 = mark.practicalMark2;
   this.theoreticalMark2 = mark.theoreticalMark2;
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

Mark.getReport = (sqlQuery, finalType, exam, result) => {
   sql.query(
      `SELECT marks.idMark, marks.studentId,marks.lessonId ,marks.coHeadId,marks.theoreticalMark,marks.markDate,marks.practicalMark,marks.finalMark,marks.final2,marks.lift,marks.status,marks.status2,marks.practicalMark2,marks.theoreticalMark2, student.id , student.name,student.sectionid,student.level,student.class,student.sex,student.type ,COUNT(*) AS totalFail, SUM(theoreticalMark + practicalMark + ${finalType} +  ${exam}) / COUNT(studentId) AS average FROM marks JOIN student WHERE marks.studentId=student.id ${sqlQuery} GROUP BY studentId ORDER BY SUM(theoreticalMark + practicalMark + finalMark) / COUNT(studentId) DESC`,
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

Mark.getStudentFail = (type, final, studentId, result) => {
   sql.query(
      `SELECT * ,(SELECT name FROM lesson WHERE marks.lessonId = lesson.id) AS lessonName FROM marks WHERE (theoreticalMark + practicalMark + ${final} + ${type}) < 50 AND studentId = ${studentId}`,
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

Mark.getAll = (sqlQuery, result) => {
   sql.query(
      `SELECT *,(theoreticalMark + practicalMark + finalMark + IFNULL(lift,0) ) AS finalMark1,IF(final2 =0 ,0,(theoreticalMark + practicalMark + final2 + IFNULL(lift,0) )) AS finalMark2,(IFNULL(theoreticalMark2,0) + IFNULL(practicalMark2,0) + finalMark + IFNULL(lift,0)) AS aFinalMark1 ,IF(final2 =0 ,0,(IFNULL(theoreticalMark2,0) + IFNULL(practicalMark2,0) + final2 + IFNULL(lift,0))) AS aFinalMark2, (SELECT name FROM student WHERE id = marks.studentId) AS studentName , (SELECT name FROM lesson WHERE id = marks.lessonId) AS lessonName FROM marks WHERE 1=1 ${sqlQuery}`,
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

Mark.getByTwo = (sqlQuery, result) => {
   sql.query(
      `SELECT studentId , lessonId,coHeadId,(theoreticalMark + IFNULL(theoreticalMark2,0)) AS theoreticalMark,markDate,(practicalMark + IFNULL(practicalMark2,0) ) AS practicalMark,finalMark,final2,IFNULL(lift,0) As lift,status,status2,(theoreticalMark + practicalMark + finalMark + IFNULL(lift,0) + IFNULL(theoreticalMark2,0) + IFNULL(practicalMark2,0) ) As finalMark1 ,(theoreticalMark + practicalMark + final2 + IFNULL(lift,0) + IFNULL(theoreticalMark2,0) + IFNULL(practicalMark2,0) ) As finalMark2 , (IFNULL(theoreticalMark2,0) + IFNULL(practicalMark2,0) + finalMark + IFNULL(lift,0) ) As aFindMark ,  (IFNULL(theoreticalMark2,0) + IFNULL(practicalMark2,0)+ final2 + IFNULL(lift,0) ) As aFinalMark2 ,(SELECT name FROM student WHERE id = marks.studentId) AS studentName , (SELECT name FROM lesson WHERE id = marks.lessonId) AS lessonName FROM marks WHERE 1=1 ${sqlQuery} `,
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
      `SELECT *, (theoreticalMark + practicalMark + finalMark + IFNULL(lift,0) ) As finalMark1 ,(theoreticalMark + practicalMark + final2 + IFNULL(lift,0) ) As finalMark2 , (IFNULL(theoreticalMark2,0) + IFNULL(practicalMark2,0) + finalMark + IFNULL(lift,0) ) As aFindMark ,  (IFNULL(theoreticalMark2,0) + IFNULL(practicalMark2,0) + final2 + IFNULL(lift,0) ) As aFinalMark2 , (SELECT name FROM student WHERE id = marks.studentId) AS studentName , (SELECT name FROM lesson WHERE id = marks.lessonId) AS lessonName FROM marks WHERE (theoreticalMark + practicalMark + finalMark ) < 50 AND (theoreticalMark + practicalMark + final2 ) < 50 ${sqlQuery} ORDER BY finalMark1`,
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
      `UPDATE marks SET ? WHERE idMark = ${markData.idMark}`,
      markData,
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
