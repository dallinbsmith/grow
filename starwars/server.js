const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 10100;

app.use(bodyParser.json());
app.use(cors());

app.use("/people", require("./routes/people"));
app.use("/planets", require("./routes/planets"));

mongoose.connect("mongodb://localhost/swapi", err => {
    if (err) throw err;
    console.log("Connected to the swapi database");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
