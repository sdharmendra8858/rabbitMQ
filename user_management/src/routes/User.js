const express = require("express");
const UserService = require("./../services/user/UserService");
const auth = require("./../middleware/auth");

const route = express.Router();

route.get("/help", (req, res) => {
    res.send("help page")
})

route.post("/register", async(req, res) => {
    console.log("----- Register the user -----");
    try{
        const userService = new UserService();
        const result = await userService.registerUser(req.body);

        res.send(result);
    }catch(err){
        console.error("----- Error in register user -----", err);
        res.status(400).send(err);
    }
})

route.post("/login", async(req, res) => {
    console.log("----- Login the user -----");
    try{
        const userService = new UserService();
        const result = await userService.login(req.body);

        res.send(result);
    }catch(err){
        console.error("----- Error in Logging user -----", err);
        res.status(400).send(err);
    }
})

route.post("/logout", auth, async (req, res) => {
    console.log("---- Logging out the user -----");
    try{
        const userService = new UserService();
        const result = await userService.logout(req.user, req.token);

        res.send(result);
    }catch(err){
        console.error("----- Error in logging out the user -----");
        res.status(400).send(err);
    }
})

route.post("/sendMessage", auth, async(req, res) => {
    console.log("----- Sending message -----");
    try{
        const userService = new UserService();
        const result = await userService.sendMessage(req.user, req.body.message);

        res.send(result);
    }catch(err){
        console.error("----- Error in sending message -----");
        res.status(400).send(err);
    }
})

module.exports = route;