const MarkMaster = require("../models/markMaster.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const markMaster = new MarkMaster({
      studentId: req.body.studentId,
      lessonId: req.body.lessonId,
      masterId: req.body.masterId,
      markType: req.body.markType,
      degree: req.body.degree,
      examType: req.body.examType,
      status: req.body.status,
   });


   MarkMaster.checkDegree(markMaster , (err , data) =>{
      console.log(markMaster)
      if(err){
         MarkMaster.create(markMaster, (err, data) => {
            if (err)
               res.status(500).send({
                  message:
                     err.message ||
                     "Some error occurred while creating the MarkMaster.",
               });
            else res.send(data);
         });
      }else{
         MarkMaster.updateById(
            data[0].idMarkMaster,
            new MarkMaster(req.body),
            (err, data) => {
               if (err) {
                  if (err.kind === "not_found") {
                     res.status(404).send({
                        message: `Not found MarkMaster with id ${data[0].idMarkMaster}.`,
                     });
                  } else {
                     res.status(500).send({
                        message: "Error updating MarkMaster with id " + data[0].idMarkMaster,
                     });
                  }
               } else res.send(data);
            }
         );
      }
   })

  
};

exports.findAll = (req, res) => {
   MarkMaster.getAll((err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while retrieving MarkMaster.",
         });
      else res.send(data);
   });
};

exports.findSummerTraining = (req, res) => {
   MarkMaster.getSummerTraining(req.params.studentId, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message ||
               "Some error occurred while retrieving MarkMaster.",
         });
      else res.send(data);
   });
};

exports.findAllForAverage = (req, res) => {
   MarkMaster.getAllForAverage(
      req.query.level,
      req.query.sectionId,

      (err, data) => {
         if (err)
            res.status(500).send({
               message:
                  err.message ||
                  "Some error occurred while retrieving MarkMaster.",
            });
         else res.send(data);
      }
   );
};


exports.findStudentAllMarks = (req, res) => {
   MarkMaster.getStudentAllMarks(
      req.query.level,
      req.query.sectionId,
      req.query.collegeNumber,
      (err, data) => {
         if (err)
            res.status(500).send({
               message:
                  err.message ||
                  "Some error occurred while retrieving MarkMaster.",
            });
         else res.send(data);
      }
   );
};

exports.findAllForAverages = (req, res) => {
   MarkMaster.getAllForAverages(
      req.query.level,
      req.query.sectionId,
      
      (err, data) => {
         if (err){
            res.status(500).send({
               message:
                  err.message ||
                  "Some error occurred while retrieving MarkMaster.",
                  error : err
            });
         }else res.send(data);
      }
   );
};

exports.findAllForAverageClass = (req, res) => {
   MarkMaster.getAllForAverageClass(
      req.query.level,
      req.query.sectionId,
      req.query.class,
      (err, data) => {
         if (err)
            res.status(500).send({
               message:
                  err.message ||
                  "Some error occurred while retrieving MarkMaster.",
            });
         else res.send(data);
      }
   );
};

exports.findStudentForAverage = (req, res) => {
   MarkMaster.getStudentForAverage(
      req.query.level,
      req.query.sectionId,
      req.query.collageNumber,
      (err, data) => {
         if (err)
            res.status(500).send({
               message:
                  err.message ||
                  "Some error occurred while retrieving MarkMaster.",
            });
         else res.send(data);
      }
   );
};

exports.findQuery = (req, res) => {
   let querySql = req.query.sqlQuery;
   MarkMaster.getQuery(querySql, (err, data) => {
      if (err)
         res.status(500).send({
            message: "Some error occurred while retrieving MarkMaster.",
         });
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   MarkMaster.findById(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found MarkMaster with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving MarkMaster with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.createMultiDegree = (req, res) => {
   let unParseData = req.body.marks;

   let marks = JSON.parse(unParseData);

   let errList = [];

   marks.forEach((mark) => {
      const markMaster = new MarkMaster({
         studentId: mark.studentId,
         lessonId: mark.lessonId,
         masterId: mark.masterId,
         markType: mark.markType,
         degree: mark.degree,
         examType: "unSetColumn",
         status: mark.status,
      });

      MarkMaster.checkDegree(markMaster, (err, data) => {
         if (err) {
            MarkMaster.create(markMaster, (err, data) => {
               if (err) {
                  console.log({
                     message:
                        err.message ||
                        "Some error occurred while creating the MarkMaster.",
                  });
                  errList.push(err);
               } else console.log(data);
            });
         } else {
            mark.examType = "unSetColumn";
            MarkMaster.updateById(
               mark.idMarkMaster,
               new MarkMaster(mark),
               (err, data) => {
                  if (err) {
                     if (err.kind === "not_found") {
                        console.log({
                           message: `Not found MarkMaster with id ${mark.idMarkMaster}.`,
                        });
                     } else {
                        console.log({
                           message:
                              "Error updating MarkMaster with id " +
                              mark.idMarkMaster,
                        });
                        errList.push(err);
                     }
                  } else console.log(data);
               }
            );
         }
      });
   });

   if (errList.length > 0) {
      res.status(500).send({
         message:
            err.message || "Some error occurred while retrieving MarkMaster.",
      });
   } else {
      res.send({ message: "complete upload data" });
   }
};

exports.update = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   MarkMaster.updateById(
      req.params.id,
      new MarkMaster(req.body),
      (err, data) => {
         if (err) {
            if (err.kind === "not_found") {
               res.status(404).send({
                  message: `Not found MarkMaster with id ${req.params.id}.`,
               });
            } else {
               res.status(500).send({
                  message: "Error updating MarkMaster with id " + req.params.id,
               });
            }
         } else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   MarkMaster.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found MarkMaster with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete MarkMaster with id " + req.params.id,
            });
         }
      } else res.send({ message: `MarkMaster was deleted successfully!` });
   });
};
