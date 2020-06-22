const MasterType = require("../models/masterType.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const masterType = new MasterType({
      typeName: req.body.typeName,
   });

   MasterType.create(masterType, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while creating the MasterType.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   MasterType.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while retrieving MasterType.",
         });
      else res.send(data);
   });
};

exports.findQuery = (req, res) => {
   let querySql = req.query.sqlQuery;
   MasterType.getQuery(querySql, (err, data) => {
      if (err)
         res.status(500).send({
            message: "Some error occurred while retrieving MasterType.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   MasterType.findById(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found MasterType with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving MasterType with id " + req.params.id,
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

   MasterType.updateById(
      req.params.id,
      new MasterType(req.body),
      (err, data) => {
         if (err) {
            if (err.kind === "not_found") {
               res.status(404).send({
                  message: `Not found MasterType with id ${req.params.id}.`,
               });
            } else {
               res.status(500).send({
                  message: "Error updating MasterType with id " + req.params.id,
               });
            }
         } else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   MasterType.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found MasterType with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete MasterType with id " + req.params.id,
            });
         }
      } else res.send({ message: `MasterType was deleted successfully!` });
   });
};
