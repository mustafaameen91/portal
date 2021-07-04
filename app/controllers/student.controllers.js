const Student = require("../models/student.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const student = new Student({
      class: req.body.class,
   });

   Student.create(student, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while creating the student.",
         });
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   const page = parseInt(req.query.page);
   const limit = parseInt(req.query.limit);

   const startIndex = (page - 1) * limit;
   const endIndex = page * limit;

   Student.getAll(startIndex, endIndex, (err, data) => {
      if (err)
         res.status(500).send({
            message: "Some error occurred while retrieving students.",
         });
      else {
         res.send(data);
      }
   });
};

exports.findBySectionId = (req, res) => {
   const sectionId = req.query.sectionId;
   const page = parseInt(req.query.page);
   const limit = parseInt(req.query.limit);

   const startIndex = (page - 1) * limit;
   const endIndex = page * limit;

   Student.getBySectionId(startIndex, endIndex, sectionId, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found student with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving student with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.findByStudentName = (req, res) => {
   const studentName = req.query.name;

   Student.getByStudentName(studentName, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found student with name ${req.params.name}.`,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving student with name " + req.params.name,
            });
         }
      } else res.send(data);
   });
};

exports.findByCollageNumber = (req, res) => {
   const collageNumber = req.query.coNumber;

   Student.getByCollageNumber(collageNumber, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found student with collageNumber ${req.params.coNumber}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving student with collageNumber " +
                  req.params.coNumber,
            });
         }
      } else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Student.findById(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found student with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving student with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.findBySections = (req, res) => {
   let sectionData = JSON.parse(req.query.students);

   let sqlQuery = "";

   sectionData.forEach((section, index) => {
      if (index == 0) {
         sqlQuery += ` AND (student.sectionid = ${section.sectionId} AND student.level = ${section.level} AND student.status = 1)`;
      } else {
         sqlQuery += ` OR (student.sectionid = ${section.sectionId} AND student.level = ${section.level} AND student.status = 1)`;
      }
   });
   Student.getBySections(sqlQuery, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found student with sectionId.`,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving student with sectionId",
            });
         }
      } else res.send(data);
   });
};

exports.findStudentInfo = (req, res) => {
   const page = parseInt(req.query.page);
   const limit = parseInt(req.query.limit);

   const startIndex = (page - 1) * limit;
   const endIndex = page * limit;

   let sex = req.query.sex;
   let sectionId = req.query.sectionId;
   let status = req.query.status;
   let className = req.query.className;
   let studentName = req.query.studentName;
   let level = req.query.level;
   let type = req.query.type;
   let grdat = req.query.grdat;
   let manyStatus = req.query.manyStatus * 1;

   console.log(sectionId);

   let sqlQuery = "";

   if (sex) {
      sqlQuery += `AND SEX = '${sex}' `;
   }
   if (grdat) {
      sqlQuery += `AND grdat = '${grdat}' `;
   }

   if (sectionId) {
      sqlQuery += `AND sectionid = '${sectionId}' `;
   }

   if (manyStatus) {
      sqlQuery += `AND status IN ${status} `;
   } else {
      if (status) {
         sqlQuery += `AND status = '${status}' `;
      }
   }

   if (className) {
      sqlQuery += `AND class = '${className}' `;
   }
   if (studentName) {
      sqlQuery += `AND name LIKE '${studentName}%' `;
   }
   if (level) {
      sqlQuery += `AND level = '${level}' `;
   }
   if (type) {
      sqlQuery += `AND type = '${type}' `;
   }

   Student.getStudentInfo(startIndex, endIndex, sqlQuery, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found student `,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving student",
            });
         }
      } else res.send(data);
   });
};

exports.findStudentInfoSignUp = (req, res) => {
   const page = parseInt(req.query.page);
   const limit = parseInt(req.query.limit);

   const startIndex = (page - 1) * limit;
   const endIndex = page * limit;

   let sex = req.query.sex;
   let sectionId = req.query.sectionId;
   let status = req.query.status;
   let className = req.query.className;
   let studentName = req.query.studentName;
   let level = req.query.level;
   let type = req.query.type;
   let name = req.query.name;
   let manyStatus = req.query.manyStatus * 1;

   // ADDED 5-12-2020 By Ahmad Faris
   let enter_year = req.query.enterYear;
   let grad_year = req.query.gradYear;

   console.log(sectionId);

   let sqlQuery = "";

   if (sex) {
      sqlQuery += `AND SEX = '${sex}' `;
   }

   if (enter_year) {
      sqlQuery += `AND enter_year = '${enter_year}' `;
   }

   if (grad_year) {
      sqlQuery += `AND grdat = '${grad_year}' `;
   }

   if (name) {
      sqlQuery += `AND name LIKE '%${name}%' `;
   }

   if (sectionId) {
      sqlQuery += `AND sectionid = '${sectionId}' `;
   }

   if (manyStatus) {
      sqlQuery += `AND status IN ${status} `;
   } else {
      if (status) {
         sqlQuery += `AND status = '${status}' `;
      }
   }

   if (className) {
      sqlQuery += `AND class = '${className}' `;
   }
   if (studentName) {
      sqlQuery += `AND name LIKE '${studentName}%' `;
   }
   if (level) {
      sqlQuery += `AND level = '${level}' `;
   }
   if (type) {
      sqlQuery += `AND type = '${type}' `;
   }

   Student.getStudentInfo(startIndex, endIndex, sqlQuery, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found student `,
            });
         } else {
            res.status(500).send({
               message: "Error retrieving student",
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

   Student.updateById(req.body.id, req.body.className, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found student with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Error updating student with id " + req.params.id,
            });
         }
      } else res.send(data);
   });
};

exports.delete = (req, res) => {
   Student.remove(req.params.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found student with id ${req.params.id}.`,
            });
         } else {
            res.status(500).send({
               message: "Could not delete student with id " + req.params.id,
            });
         }
      } else res.send({ message: `student was deleted successfully!` });
   });
};
