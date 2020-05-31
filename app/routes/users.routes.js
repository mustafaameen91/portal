module.exports = (app) => {
   const Users = require("../controllers/users.controllers.js");

   app.post("/api/addUser", Users.create);

   app.post("/api/login", Users.loginUser);

   app.get("/api/users", Users.findAll);

   app.get("/api/getByQuery", Users.findQuery);

   app.get("/api/user/:id", Users.findOne);

   app.put("/api/user/:id", Users.update);

   app.delete("/api/user/:id", Users.delete);
};
