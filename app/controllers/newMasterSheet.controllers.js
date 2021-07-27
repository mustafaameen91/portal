const NewMasterSheet = require("../models/newMasterSheet.models.js");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

let transporter = nodemailer.createTransport(
   smtpTransport({
      service: "gmail",
      pool: true,
      port: 465,
      auth: {
         user: "results5@duc.edu.iq",
         pass: "20032004",
      },
   })
);

let mailOptions = {
   from: "result@duc.edu.iq",
   to: "",
   subject: "السعي السنوي",
   text: "",
};

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
      downgrade: 0,
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

exports.sendMailToStudent = (req, res) => {
   console.log(req.body.body);

   if (req.body.email.length > 0) {
      mailOptions.to = req.body.email;

      let messageBody = `
         <html lang="ar" dir="rtl">
            <head>
               <style>
                  body {
                     text-align: center;
                     direction: rtl !important;
                  }

                  .message-content {
                     display: block !important;
                     width: 100% !important;
                     background-color: whitesmoke !important;
                     border-radius: 10px !important;
                     padding: 40px !important;
                     text-align: center !important;
                     direction: rtl !important;
                  }
                  h1 {
                     font-size: 35px;
                     color: black !important;
                     text-align: center !important;
                     display: block !important;
                     direction: rtl !important;
                  }

                  p {
                     font-size: 20px !important;
                     color: black !important;
                     text-align: center !important;
                     display: block !important;
                     direction: rtl !important;
                  }

                  a {
                     display: block !important;
                     width: 120px !important;
                     text-align: center !important;
                     padding: 10px 10px !important;
                     background: #28DF47 !important;
                     color: white !important;
                     border-radius: 5px !important;
                     text-decoration: none !important;
                     margin: 0 auto !important;
                  }
                  table{
                     width:80%
                  }
               </style>   
            </head>
            <body>   
               <div class="message-content">
               <img src="https://library.duc.edu.iq/wp-content/uploads/sites/22/2020/08/unnamed-file-1.png" width="300">
               ${req.body.body}
               </div>
            </body>
         </html>
         `;

      mailOptions.html = messageBody;

      transporter.sendMail(mailOptions, (err, data) => {
         if (err) {
            console.log(err);
            console.log("error with sending email");
            res.status(500).send({
               message: "the information is not correct",
            });
            return;
         } else {
            res.status(200).send({
               message: "the email has been send",
            });
         }
      });
   } else {
      console.log("email not found");
   }
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
   let sClass = req.query.class;
   let year = req.query.year;
   let course = req.query.course;
   let studyType = req.query.studyType;

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
   if (studyType) {
      sqlQuery += `AND studyType = '${studyType}' `;
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

exports.getStudentIdMaster = (req, res) => {
   NewMasterSheet.findStudentId(req.params.studentId, (err, data) => {
      if (err) {
         res.send(err);
      } else {
         res.send(data);
      }
   });
};

exports.findAllByMasterIdLast = (req, res) => {
   let lessonId = req.query.lessonId;

   console.log(lessonId);

   NewMasterSheet.findDegreeByMasterId(req.query.id, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found newMasterSheet with id ${req.query.id}.`,
            });
         } else {
            res.status(500).send({
               message:
                  "Error retrieving newMasterSheet with id " + req.query.id,
            });
         }
      } else {
         let results = {
            ...data.masterSheet,
            students: data.students.map((student) => {
               return {
                  idStudentMaster: student.idStudentMaster,
                  studentId: student.studentId,
                  name: student.name,
                  note: student.note,
                  sex: student.sex,
                  college_number: student.college_number,
                  marks: data.marks.filter((mark) => {
                     return (
                        mark.studentId == student.studentId &&
                        mark.lessonId == lessonId
                     );
                  }),
               };
            }),
         };

         res.send(results);
      }
   });
};

exports.findAllByMasterId = (req, res) => {
   NewMasterSheet.findDegreeByMasterId(req.params.id, (err, data) => {
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
            ...data.masterSheet,
            students: data.students.map((student) => {
               return {
                  idStudentMaster: student.idStudentMaster,
                  studentId: student.studentId,
                  name: student.name,
                  note: student.note,
                  sex: student.sex,
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
                  email: student.email,
                  sex: student.sex,
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
