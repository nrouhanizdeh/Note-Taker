const express = require("express");

// Tells node that we are creating an "express" server
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const apiRoutes = require("./routes/apiRoutes")(app);
const htmlRoutes = require("./routes/htmlRoutes")(app);

//Start the server on the port
app.listen(PORT, () => console.log("Listening on PORT: " + PORT));
