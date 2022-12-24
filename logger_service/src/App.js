const Consumer = require("./messaging-service/Consumer");
require("dotenv").config();

Consumer().catch(err => {
    console.error("---- Error in Messaging consumer -----");
    console.error(err);
})