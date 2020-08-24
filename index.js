let cors = require("cors");
let express = require("express");
let mongoose = require("mongoose");
let apiRoutes = require("./routes");
let bodyParser = require("body-parser");

let app = express();
app.use(cors());

var port = process.env.PORT || 8080;

app.get("/", (req, res) => res.send("Welcome to Express"));

app.listen(port, function () {
  console.log("Running on Port " + port);
});

//configure bodyparser to hande the post requests
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use("/api", apiRoutes);
//connect to mongoose
const dbPath = process.env.MONOGDB_PATH || "mongodb://localhost/tasks";
const options = { useNewUrlParser: true, useUnifiedTopology: true };
const mongo = mongoose.connect(dbPath, options);
mongo.then(
  () => {
    console.log("database connected");
  },
  error => {
    console.log(error, "error");
  }
);
