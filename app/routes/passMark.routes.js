module.exports = (app) => {
   const PassMarks = require("../controllers/passMark.controllers.js");

   app.post("/api/addPassMark", PassMarks.create);

   app.post("/api/addPassLift", PassMarks.updateLift);

   app.post("/api/updatePassStatus", PassMarks.updateStatusData);

   app.get("/api/passMarks", PassMarks.findAll);

   app.get("/api/passMarkLift", PassMarks.findLiftDegree);
};
