const UserModel = require("../../db/model/UserModel");
const ResponseService = require("../common/ResponseService");
const Producer = require("./../../messing-service/Publisher");
const Encryption = require("../common/Encryption");
const { v4: uuidv4 } = require("uuid");
const UserUtility = require("./UserUtility");

class UserService extends ResponseService{
    constructor(){
        super();
        this.userModel = new UserModel();
        this.encryption = new Encryption();
        this.userUtility = new UserUtility();
    }

    async registerUser(userDetails){
        console.log("----- In UserService registerUser method -----");
        try{
            userDetails.user_id = uuidv4();
            const user = await this.userModel.findOne({email: userDetails.email});
            if(user !== null && user !== undefined && Object.keys(user).length !== 0){
                return Promise.reject("Email alreaady exist !!");
            }
            userDetails.password = this.encryption.encypt(userDetails.password);

            // generate token and login the user
            const token = this.userUtility.generateJWT({user_id: userDetails.user_id});
            userDetails.tokens = [{token}];
            const resposne = await this.userModel.save(userDetails);
            await Producer(userDetails.user_id, "User Registered.");
            return this.successResponse(resposne);
        }catch(err){
            console.error("----- Error in UserService registerUser method -----", err.message);
            return Promise.reject(err);
        }
    }

    async updateUser(condition, updateObject){
        console.log("----- In UserService updateUser method -----");
        try{
            const result = await this.userUtility.updateRecord(condition, updateObject);
            return Promise.resolve(this.successResponse(result));
        }catch(err){
            console.error("----- Error in UserService updateUser method -----", err);
            return Promise.reject(err);
        }
    }

    async login(body){
        console.log("----- In UserService login method -----");
        try{
            const password = this.encryption.encypt(body.password);
            const record = await this.userUtility.login({email: body.email, password});

            await Producer(record.user_id, "User Logged In");
            return Promise.resolve(this.successResponse(record));
        }catch(err){
            console.error("----- Error in UserService login method -----", err);
            return Promise.reject(err);
        }
    }

    async logout(body, loggedToken){
        console.log("----- In UserService logout method -----");
        try{

            const tokens = body.tokens;
            let tokenIndex = tokens.findIndex(token => token.token === loggedToken);
            tokens.splice(tokenIndex, 1);

            const result = await this.userUtility.updateRecord({user_id: body.user_id}, {tokens});
            if(result.modifiedCount === 1){
                await Producer(body.user_id, "User Logged out.");
                return Promise.resolve(this.successResponse({
                    "message": "Successfully Logged out of device",
                    "user_id": body.user_id
                }))
            }else{
                return Promise.reject("Error ocurred while log out !!");
            }
        }catch(err){
            console.error("----- Error in UserService logout method -----", err);
            return Promise.reject(err);
        }
    }

    async sendMessage(user, message){
        try{
            const messages = user.messages;

            messages.push({
                message,
                created_at: new Date(),
            });

            const result = await this.userUtility.updateRecord({user_id: user.user_id}, {messages});

            if(result.modifiedCount === 1){
                await Producer(user.user_id, `Message: ${message}`);
                return Promise.resolve(this.successResponse({
                    message: "Message sent !!!"
                }));
            }else
                return Promise.reject("Error in Sending message !!")
        }catch(err){
            console.error("----- Error in UserService sendMessage method -----", err);
            return Promise.reject(err);
        }
    }

}

module.exports = UserService;