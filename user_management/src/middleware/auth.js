const jwt = require('jsonwebtoken')
const UserModel = require('../db/model/UserModel')
require('dotenv').config();

const auth = async(req, res, next) => {
    console.log("----- Authentication Process -----");
    try{
        const token = req.header('authorization').replace('Bearer ','')
        const decode = await jwt.verify(token, process.env.JWT_SECRET)
        const userModel = new UserModel();
        const user = await userModel.findOne({ user_id: decode.user_id , 'tokens.token' : token})

        if(!user || !Object.keys(user).length){
            throw new Error("Invalid User");
        }

        req.token = token
        req.user = user
        next()
    }catch(e){
        console.error("----- Error in authentication -----", e);
        res.status(401).send({Error: 'Authentication Fail'})
    }
}

module.exports = auth