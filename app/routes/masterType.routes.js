module.exports = (app) => {
   const MasterType = require("../controllers/masterType.controllers.js");

   app.post("/api/v2/addMasterType", MasterType.create);

   app.get("/api/v2/masterTypes", MasterType.findAll);

   app.get("/api/v2/getByQuery", MasterType.findQuery);

   app.get("/api/v2/masterType/:id", MasterType.findOne);

   app.put("/api/v2/masterType/:id", MasterType.update);

   app.delete("/api/v2/masterType/:id", MasterType.delete);
};
