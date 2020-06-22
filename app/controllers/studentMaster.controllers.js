const StudentMaster = require("../models/studentMaster.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const studentMaster = new StudentMaster({
      studentId: req.body.studentId,
      masterId: req.body.masterId,
      note: req.body.note,
   });

   StudentMaster.create(studentMaster, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while creating the studentMaster.",
         });
      else res.send(data);
   });
};

exports.createMultiStudents = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   StudentMaster.createMultiStudent(req.body.students, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while creating the studentMaster.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   StudentMaster.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while retrieving studentMaster.",
         });
      else res.send(data);
   });
};

exports.findQuery = (req, res) => {
   let querySql = req.query.sqlQuery;
   StudentMaster.getQuery(querySql, (err, data) => {
      if (err)
         res.status(500).send({
            message: "Some error occurred while retrieving studentMaster.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   StudentMaster.findById(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found studentMaster with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving studentMaster with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.update = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   StudentMaster.updateById(
      req.params.id,
      new StudentMaster(req.body),
      (err, data) => {
         if (err) {
            if (err.kind === "not_found") {
               res.status(404).send({
                  message: `Not found studentMaster with id ${req.params.id}.`,
               });
            } else {
               res.status(500).send({
                  message:
                     "Error updating studentMaster with id " + req.params.id,
               });
            }
         } else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   StudentMaster.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found studentMaster with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Could not delete studentMaster with id " + req.params.id,
            });
         }
      } else res.send({ message: `studentMaster was deleted successfully!` });
   });
};
