const sql = require("./db.js");

const Lesson = function (lesson) {
   this.name = lesson.name;
   this.sectionid = lesson.sectionid;
   this.teacherid = lesson.teacherid;
   this.credit = lesson.credit;
   this.required = lesson.required;
   this.mgroupid = lesson.mgroupid;
   this.prevlesson = lesson.prevlesson;
   this.year = lesson.year;
   this.theoretical = lesson.theoretical;
   this.practical = lesson.practical;
   this.final = lesson.final;
   this.enName = lesson.enName;
   this.level = lesson.level;
   this.thHoure = lesson.thHoure;
   this.prHoure = lesson.prHoure;
   this.course = lesson.course;
};

Lesson.create = (newLesson, result) => {
   sql.query("INSERT INTO lesson SET ?", newLesson, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created lesson: ", { id: res.insertId, ...newLesson });
      result(null, { message: "ok" });
   });
};

Lesson.getAll = (sqlQuery, result) => {
   sql.query(
      `SELECT * ,(SELECT name FROM section WHERE lesson.sectionid = section.id) AS sectionName FROM lesson WHERE 1=1 ${sqlQuery}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         // console.log("lessons: ", res);
         result(null, res);
      }
   );
};

Lesson.findById = (lessonId, result) => {
   sql.query(
      `SELECT * ,(SELECT section.name FROM section WHERE lesson.sectionid = section.id ) AS sectionName FROM lesson WHERE id = ${lessonId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found lesson: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

Lesson.updateById = (id, lesson, result) => {
   sql.query(`UPDATE lesson SET ? WHERE id = ${id} `, lesson, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("updated lesson: ", { id: id, ...lesson });
      result(null, { id: id, ...lesson });
   });
};

Lesson.remove = (id, result) => {
   sql.query("DELETE FROM lesson WHERE id = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted lesson with id: ", id);
      result(null, res);
   });
};

module.exports = Lesson;
