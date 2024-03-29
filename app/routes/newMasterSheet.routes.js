module.exports = (app) => {
   const NewMasterSheet = require("../controllers/newMasterSheet.controllers.js");

   app.post("/api/v2/addNewMasterSheet", NewMasterSheet.create);

   app.get("/api/v2/masterSheets", NewMasterSheet.findAll);

   app.get("/api/v2/allMasterSheet/:id", NewMasterSheet.findOneByMasterId);

   app.get(
      "/api/v2/checkMasters/:studentId",
      NewMasterSheet.getStudentIdMaster
   );

   app.get("/api/v2/allMasterSheet", NewMasterSheet.findByFilter);

   app.get("/api/v2/getMastersByTeacherIds", NewMasterSheet.findByTeacherId);

   app.get("/api/v2/getByQuery", NewMasterSheet.findQuery);

   app.get("/api/v2/masterSheet/:id", NewMasterSheet.findOne);

   app.get("/api/v2/allMasterSheets/:id", NewMasterSheet.findAllByMasterId);

   app.get("/api/v2/allMasterSheets", NewMasterSheet.findAllByMasterIdLast);

   app.post("/api/v2/masterSheet/:id", NewMasterSheet.update);

   app.post("/api/v2/sendEmail", NewMasterSheet.sendMailToStudent);

   app.delete("/api/v2/masterSheet/:id", NewMasterSheet.delete);
};
