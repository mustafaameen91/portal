const Marks = require("../models/marks.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const marks = new Marks({
      studentId: req.body.studentId,
      lessonId: req.body.lessonId,
      coHeadId: req.body.coHeadId,
      theoreticalMark: req.body.theoreticalMark,
      practicalMark: req.body.practicalMark,
      finalMark: req.body.finalMark,
      final2: req.body.final2,
      lift: req.body.lift,
      status: req.body.status,
      status2: req.body.status2,
      theoreticalMark2: req.body.theoreticalMark2,
      practicalMark2: req.body.practicalMark2,
      practicalFinal: req.body.practicalFinal,
      practicalFinal2: req.body.practicalFinal2,
      yearWorkT: req.body.yearWorkT,
      yearWorkP: req.body.yearWorkP,
      practicalStatus: req.body.practicalStatus,
      theoreticalStatus: req.body.theoreticalStatus,
   });

   if (req.body.id) {
      let markData = {
         idMark: req.body.id,
         studentId: req.body.studentId,
         lessonId: req.body.lessonId,
         coHeadId: req.body.coHeadId,
         theoreticalMark: req.body.theoreticalMark,
         practicalMark: req.body.practicalMark,
         finalMark: req.body.finalMark,
         final2: req.body.final2,
         lift: req.body.lift,
         status: req.body.status,
         status2: req.body.status2,
         theoreticalMark2: req.body.theoreticalMark2,
         practicalMark2: req.body.practicalMark2,
         practicalFinal: req.body.practicalFinal,
         practicalFinal2: req.body.practicalFinal2,
         yearWorkT: req.body.yearWorkT,
         yearWorkP: req.body.yearWorkP,
         practicalStatus: req.body.practicalStatus,
         theoreticalStatus: req.body.theoreticalStatus,
      };
      Marks.updateById(markData, (err, data) => {
         if (err) {
            if (err.kind === "not_found") {
               res.status(404).send({
                  message: `Not found mark with id ${req.params.id}.`,
               });
            } else {
               res.status(500).send({
                  message: "Error updating mark with id " + req.params.id,
               });
            }
         } else res.send(data);
      });
   } else {
      Marks.create(marks, (err, data) => {
         if (err)
            res.status(500).send({
               message:
                  err.message ||
                  "Some error occurred while creating the marks.",
            });
         else res.send(data);
      });
   }
};

exports.findAll = (req, res) => {
   let studentId = req.query.studentId;
   let lessonId = req.query.lessonId;
   let lessonsId = req.query.lessonsId;
   let status = req.query.status;

   let sqlQuery = "";

   if (studentId) {
      sqlQuery += `AND studentId = '${studentId}' `;
   }
   if (lessonId) {
      sqlQuery += `AND lessonId = '${lessonId}' `;
   }
   if (lessonsId) {
      sqlQuery += `AND lessonId IN (${lessonsId}) `;
   }
   if (status) {
      sqlQuery += `AND status = '${status}' `;
   }

   Marks.getAll(sqlQuery, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving lesson.",
         });
      else res.send(data);
   });
};

exports.findMasterSheet = (req, res) => {
   let infoData = {
      sectionId: req.query.sectionId,
      year: req.query.year,
      class: req.query.class,
      type: req.query.type,
      level: req.query.level,
   };

   Marks.getMasterSheet(infoData, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving marks.",
         });
      else res.send(data);
   });
};

exports.findReport = (req, res) => {
   let studentId = req.query.studentId;
   let sectionId = req.query.sectionId;
   let lessonsId = req.query.lessonsId;
   let level = req.query.level;
   let className = req.query.class;
   let sex = req.query.sex;
   let type = req.query.type;
   let final = req.query.final;
   let examType = req.query.examType;

   let finalType = "finalMark";
   let exam = "0";

   let sqlQuery = "";

   if (studentId) {
      sqlQuery += `AND studentId = '${studentId}' `;
   }
   if (level) {
      sqlQuery += `AND level = '${level}' `;
   }
   if (className) {
      sqlQuery += `AND class = '${className}' `;
   }
   if (sex) {
      sqlQuery += `AND sex = '${sex}' `;
   }
   if (type) {
      sqlQuery += `AND type = '${type}' `;
   }
   if (sectionId) {
      sqlQuery += `AND sectionid = '${sectionId}' `;
   }

   if (final == 2) {
      finalType =
         "IF((theoreticalMark + practicalMark + finalMark) > 50 , finalMark , final2)";
   }

   if (final == 1) {
      sqlQuery += `AND final2 = 0 `;
   }

   if (examType == 2) {
      exam = " IFNULL(practicalMark2,0) + IFNULL(theoreticalMark2,0) ";
   }

   if (lessonsId) {
      sqlQuery += `AND lessonId IN (${lessonsId}) `;
   }

   Marks.getReport(sqlQuery, exam, finalType, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving lesson.",
         });
      else res.send(data);
   });
};

exports.findStudentFail = (req, res) => {
   let studentId = req.query.studentId;
   let final = req.query.final;
   let type = req.query.type;

   let finalType = "finalMark";
   let exam = "0";

   if (final == 2) {
      finalType = "final2";
   }

   if (type == 2) {
      exam = " IFNULL(practicalMark2,0) + IFNULL(theoreticalMark2,0) ";
   }

   Marks.getStudentFail(exam, finalType, studentId, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving lesson.",
         });
      else res.send(data);
   });
};

exports.getNewMarks = (req, res) => {
   let studentId = req.query.studentId;
   let lessonId = req.query.lessonId;
   let lessonsId = req.query.lessonsId;
   let status = req.query.status;
   let levelType = req.query.leveltype;

   console.log(levelType);

   let sqlQuery = "";

   if (studentId) {
      sqlQuery += `AND studentId = '${studentId}' `;
   }
   if (lessonId) {
      sqlQuery += `AND lessonId = '${lessonId}' `;
   }
   if (lessonsId) {
      sqlQuery += `AND lessonId IN (${lessonsId}) `;
   }
   if (status) {
      sqlQuery += `AND status = '${status}' `;
   }
   if (levelType == 1) {
      Marks.getByTwo(sqlQuery, (err, data) => {
         if (err) {
            res.status(500).send({
               massage: "error retrieving marks data",
            });
         } else res.send(data);
      });
   } else if (levelType == 2) {
      Marks.getAll(sqlQuery, (err, data) => {
         if (err) {
            res.status(500).send({
               message: "err retrieving marks data",
            });
         } else res.send(data);
      });
   } else {
      res.status(500).send({ message: "please send the level type" });
   }
};

exports.findLiftDegree = (req, res) => {
   let studentId = req.query.studentId;
   let lessonsId = req.query.lessonsId;

   let sqlQuery = "";

   if (studentId) {
      sqlQuery += `AND studentId = '${studentId}' `;
   }
   if (lessonsId) {
      sqlQuery += `AND lessonId in (${lessonsId}) `;
   }

   Marks.getLiftAll(sqlQuery, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving lesson.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Marks.findById(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found lesson with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving class with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.updateLift = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   let liftData = {
      idMark: req.body.idMark,
      lift: req.body.lift,
   };

   Marks.updateLiftData(liftData, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found lesson with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error updating lesson with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.updateStatusData = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   let liftData = {
      idMark: req.body.idMark,
      status: req.body.status,
   };

   Marks.updateStatus(liftData, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found status with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error updating status with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.delete = (req, res) => {
   Marks.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found lesson with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete lesson with id " + req.params.id,
            });
         }
      } else res.send({ message: `lesson was deleted successfully!` });
   });
};
