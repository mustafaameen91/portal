const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./app/routes/lesson.routes.js")(app);
require("./app/routes/users.routes.js")(app);
require("./app/routes/student.routes.js")(app);
require("./app/routes/marks.routes.js")(app);
require("./app/routes/level.routes.js")(app);
require("./app/routes/passMark.routes.js")(app);
require("./app/routes/master.routes.js")(app);
require("./app/routes/history.routes.js")(app);
require("./app/routes/teacher.routes.js")(app);

app.listen(8000, () => {
   console.log("Server is running on port 8000.");
});
