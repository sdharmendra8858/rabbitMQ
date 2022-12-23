const UserModel = require("../../db/model/UserModel");
const jwt = require("jsonwebtoken");

class UserUtility {
    constructor(){
        this.userModel = new UserModel();
    }

    async updateRecord(matchCondition, updateObject){
        try{
            console.log("---- In UserUtility updateRecord method -----");
            const record = await this.userModel.updateRecord(matchCondition, updateObject);

            return Promise.resolve(record);
        }catch(err){
            console.error("Error in UserUtiliy updateRecord method -----");
            return Promise.reject(err);
        }
    }

    async login({email, password}){
        console.log("----- In UserUtility login method -----");
        try{
            const record = await this.userModel.findOne({email, password});

            if(record === undefined || record === null || Object.keys(record).length === 0){
                return Promise.reject("No Record Found");
            }

            const token = this.generateJWT({user_id: record.user_id});

            record.tokens.push({token});

            const result = await this.updateRecord({user_id: record.user_id}, {tokens: record.tokens});
            if(result.modifiedCount === 1){
                return Promise.resolve(record);
            }else{
                return Promise.reject("Error in Logging user In");
            }
        }catch(err){
            console.error("----- Error in UserUtility login method -----", err);
            return Promise.reject(err);
        }
    }

    generateJWT(body){
        console.log("----- In UserUtility generateJWT method -----");
        let token = jwt.sign({user_id: body.user_id}, process.env.JWT_SECRET);
        console.log(token);

        return token;
    }
}

module.exports = UserUtility;