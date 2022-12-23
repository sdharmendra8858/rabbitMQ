const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./db/Connection");

const app = express();

app.use(bodyParser.json());
app.use('/api', require("./routes/User"));

app.get("/", (req, res) => {
    res.send("hello")
})

app.listen(process.env.PORT, () => {
    console.log(`Application running on port ${process.env.PORT}`);
})