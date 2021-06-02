const Section = require("../models/section.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const section = new Section({
      name: req.body.name,
      collageid: req.body.collageid,
      credits: req.body.credits,
      type: req.body.type,
   });

   Section.create(section, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while creating the Section.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   Section.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving Section.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Section.findById(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found Section with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving Section with id " + req.params.id,
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

   Section.updateById(req.params.id, new Section(req.body), (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found Section with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error updating Section with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.delete = (req, res) => {
   Section.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found Section with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete Section with id " + req.params.id,
            });
         }
      } else res.send({ message: `Section was deleted successfully!` });
   });
};
