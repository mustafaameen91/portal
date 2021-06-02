module.exports = (app) => {
   const MarkMaster = require("../controllers/markMaster.controllers.js");

   app.post("/api/v2/addMarkMaster", MarkMaster.create);

   app.get("/api/v2/markMasters", MarkMaster.findAll);

   app.get("/api/averageMarks", MarkMaster.findAllForAverages);
   
   app.get("/api/studentAllMarks", MarkMaster.findStudentAllMarks);

   app.get("/api/averageMarksClass", MarkMaster.findAllForAverageClass);

   app.post("/api/v2/addMultiMarks", MarkMaster.createMultiDegree);

   app.get("/api/averageStudentMarks", MarkMaster.findStudentForAverage);

   app.get("/api/v2/markMaster/:id", MarkMaster.findOne);

   app.get("/api/summerTraining/:studentId", MarkMaster.findSummerTraining);

   app.post("/api/v2/markMaster/:id", MarkMaster.update);

   app.delete("/api/v2/markMaster/:id", MarkMaster.delete);
};
