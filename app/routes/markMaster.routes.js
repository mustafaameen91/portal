module.exports = (app) => {
   const MarkMaster = require("../controllers/markMaster.controllers.js");

   app.post("/api/v2/addMarkMaster", MarkMaster.create);

   app.get("/api/v2/markMasters", MarkMaster.findAll);

   app.get("/api/v2/markMaster/:id", MarkMaster.findOne);

   app.post("/api/v2/markMaster/:id", MarkMaster.update);

   app.delete("/api/v2/markMaster/:id", MarkMaster.delete);
};
