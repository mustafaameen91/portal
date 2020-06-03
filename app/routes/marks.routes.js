module.exports = (app) => {
   const Marks = require("../controllers/marks.controllers.js");

   app.post("/api/addMark", Marks.create);

   app.post("/api/addLift", Marks.updateLift);

   app.post("/api/updateStatus", Marks.updateStatusData);

   app.get("/api/marks", Marks.findAll);

   app.get("/api/masterSheet", Marks.findMasterSheet);

   app.get("/api/marksReport", Marks.findReport);

   app.get("/api/studentFail", Marks.findStudentFail);

   app.get("/api/allMarks", Marks.getNewMarks);

   app.get("/api/marksLift", Marks.findLiftDegree);
};
