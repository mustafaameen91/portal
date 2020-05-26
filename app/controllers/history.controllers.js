const MasterHistory = require("../models/history.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const masterHistory = new MasterHistory({
      masterKey: req.body.masterKey,
      students: req.body.students,
      lessons: req.body.lessons,
      marks: req.body.marks,
      sectionId: req.body.sectionId,
      class: req.body.class,
      level: req.body.level,
      year: req.body.year,
   });

   MasterHistory.create(masterHistory, (err, data) => {
      if (err)
         res.status(500).send({
            message: "Some error occurred while creating the masterHistory.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   MasterHistory.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message: "Some error occurred while retrieving users.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   MasterHistory.findById(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found masterHistory with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving masterHistory with id " + req.params.id,
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

   MasterHistory.updateById(
      req.params.id,
      new MasterHistory(req.body),
      (err, data) => {
         if (err) {
            if (err.kind === "not_found") {
               res.status(404).send({
                  message: `Not found masterHistory with id ${req.params.id}.`,
               });
            } else {
               res.status(500).send({
                  message:
                     "Error updating masterHistory with id " + req.params.id,
               });
            }
         } else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   MasterHistory.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found masterHistory with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Could not delete masterHistory with id " + req.params.id,
            });
         }
      } else res.send({ message: `masterHistory was deleted successfully!` });
   });
};
