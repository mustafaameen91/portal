const Level = require("../models/level.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const level = new Level({
      sectionId: req.body.sectionId,
      level: req.body.level,
      type: req.body.type,
      year: req.body.year,
   });

   Level.foundLevel(level, (err, data) => {
      console.log(data);
      if (data.length != 0) {
         res.send(level);
      } else {
         Level.create(level, (err, data) => {
            if (err)
               res.status(500).send({
                  message:
                     err.message ||
                     "Some error occurred while creating the level.",
               });
            else res.send(data);
         });
      }
   });
};

exports.findBySectionId = (req, res) => {
   Level.getBySectionId(
      req.query.level,
      req.query.sectionId,
      req.query.year,
      (err, data) => {
         if (err)
            res.status(500).send({
               message:
                  err.message || "Some error occurred while retrieving level.",
            });
         else res.send(data);
      }
   );
};


exports.findAll = (req, res) => {
   let year = req.query.year;
   let sectionId = req.query.sectionId;
   let level = req.query.level;

   let sqlQuery = "";
   if (year) {
      sqlQuery += `AND year = '${year}' `;
   }
   if (sectionId) {
      sqlQuery += `AND sectionId = '${sectionId}' `;
   }
   if (level) {
      sqlQuery += `AND level = '${level}' `;
   }
   Level.getAll(sqlQuery, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving level.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Level.findById(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found level with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving level with id " + req.params.id,
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

   Level.updateById(req.params.id, new Level(req.body), (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found level with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error updating level with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.delete = (req, res) => {
   Level.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found level with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete level with id " + req.params.id,
            });
         }
      } else res.send({ message: `level was deleted successfully!` });
   });
};
