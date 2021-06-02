const NewMasterSheet = require("../models/newMasterSheet.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const newMasterSheet = new NewMasterSheet({
      sectionId: req.body.sectionId,
      level: req.body.level,
      class: req.body.class,
      year: req.body.year,
      studyType: req.body.studyType,
      masterTypeId: req.body.masterTypeId,
      course: req.body.course,
      note: "",
      downgrade: 0
   });

   NewMasterSheet.create(newMasterSheet, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while creating the newMasterSheet.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   NewMasterSheet.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while retrieving newMasterSheet.",
         });
      else res.send(data);
   });
};


exports.findByTeacherId = (req, res) => {
   NewMasterSheet.getByTeacherId(req.query.teacherId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found newMasterSheet with id ${req.params.teacherId}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving newMasterSheet with id " +
                  req.params.teacherId,
            });
         }
      } else res.send(data);
   });
};

exports.findByFilter = (req, res) => {
   let sectionId = req.query.sectionId;
   let level = req.query.level;
   let sClass = req.query.sClass;
   let year = req.query.year;
   let course = req.query.course;

   let sqlQuery = "";

   if (sectionId) {
      sqlQuery += `AND sectionId = '${sectionId}' `;
   }
   if (sClass) {
      sqlQuery += `AND class = '${sClass}' `;
   }
   if (level) {
      sqlQuery += `AND level = '${level}' `;
   }
   if (year) {
      sqlQuery += `AND year = '${year}' `;
   }
   if (course) {
      sqlQuery += `AND course = '${course}' `;
   }

   NewMasterSheet.getByFilter(sqlQuery, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while retrieving newMasterSheet.",
         });
      else res.send(data);
   });
};

exports.findQuery = (req, res) => {
   let querySql = req.query.sqlQuery;
   NewMasterSheet.getQuery(querySql, (err, data) => {
      if (err)
         res.status(500).send({
            message: "Some error occurred while retrieving newMasterSheet.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   NewMasterSheet.findById(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found newMasterSheet with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving newMasterSheet with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.findOneByMasterId = (req, res) => {
   NewMasterSheet.findByMasterId(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found newMasterSheet with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving newMasterSheet with id " + req.params.id,
            });
         }
      } else {
         let results = {
            masterSheet: data.masterSheet,
            students: data.students.map((student) => {
               return {
                  idStudentMaster: student.idStudentMaster,
                  studentId: student.studentId,
                  name: student.name,
                  note: student.note,
                  college_number: student.college_number,
                  marks: data.marks.filter((mark) => {
                     return mark.studentId == student.studentId;
                  }),
               };
            }),
         };

         res.send(results);
      }
   });
};

exports.update = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }
   // console.log(req.body);
   NewMasterSheet.updateById(
      req.params.id,
      new NewMasterSheet(req.body),
      (err, data) => {
         if (err) {
            if (err.kind === "not_found") {
               res.status(404).send({
                  message: `Not found newMasterSheet with id ${req.params.id}.`,
               });
            } else {
               res.status(500).send({
                  message:
                     "Error updating newMasterSheet with id " + req.params.id,
               });
            }
         } else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   NewMasterSheet.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found newMasterSheet with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Could not delete newMasterSheet with id " + req.params.id,
            });
         }
      } else res.send({ message: `newMasterSheet was deleted successfully!` });
   });
};
