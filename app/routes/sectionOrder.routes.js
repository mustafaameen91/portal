module.exports = (app) => {
   const SectionOrder = require("../controllers/sectionOrder.controllers.js");

   app.post("/api/addOrder", SectionOrder.create);

   app.get("/api/sectionOrders", SectionOrder.findAll);

   app.get("/api/order/:id", SectionOrder.findOne);

   app.get("/api/findOrders", SectionOrder.findByQuery);

   app.put("/api/order/:id", SectionOrder.update);

   app.delete("/api/order/:id", SectionOrder.delete);
};
