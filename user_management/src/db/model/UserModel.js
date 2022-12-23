const mongoose = require("mongoose");
const userSchema = require("./../schema/UserSchema");

class UserModel {
    constructor(){
        this.model = mongoose.model('User', userSchema);
    }

    async find(condition){
        try{
            const result = [];
            const data = await this.model.find(condition);
            data.forEach(user => {
                result.push(user);
            });

            return result;
        }catch(err){
            return Promise.reject(err);
        }
    }

    async findOne(condition){
        try{
            return await this.model.findOne(condition);
        }catch(err){
            return Promise.reject(err);
        }
    }

    async save(data){
        try{
            const instance = new this.model(data);
            await instance.save((data) => {
                return data;
            })
    
            return Promise.resolve(instance.toObject());
        }catch(err){
            return Promise.reject(err);
        }
    }

    async updateRecord(matchCondition, updateObject){
        try{
            const instance = await this.model.updateOne(matchCondition, updateObject);
            return instance;
        }catch(err){
            return Promise.reject(err)
        }
    }
}

module.exports = UserModel;