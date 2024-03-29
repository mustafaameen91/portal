const PassMark = require("../models/passMark.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }
   const passMark = new PassMark({
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
      };
      PassMark.updateById(markData, (err, data) => {
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
      PassMark.create(marks, (err, data) => {
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

   PassMark.getAll(sqlQuery, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving lesson.",
         });
      else res.send(data);
   });
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

   PassMark.getLiftAll(sqlQuery, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving lesson.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   PassMark.findById(req.params.id, (err, data) => {
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

   PassMark.updateLiftData(liftData, (err, data) => {
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

   PassMark.updateStatus(liftData, (err, data) => {
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
   PassMark.remove(req.params.id, (err, data) => {
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
