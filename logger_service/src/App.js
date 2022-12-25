const Consumer = require("./messaging-service/Consumer");
const path = require("path");
const app = require('express')();
const http = require('http').Server(app);
require("dotenv").config();

Consumer(http).catch(err => {
    console.error("---- Error in Messaging consumer -----");
    console.error(err);
})


app.get('/', function (req, res) {
    res.sendFile(path.resolve("./src/static/index.html"));
});

http.listen(3001, function () {
    console.log('listening on localhost:3001');
});