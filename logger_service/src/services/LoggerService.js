const fs = require("fs");

class LoggerService {
    constructor(socket){
        this.socket = socket;
        this.dir = "./data";

        // create data folder if not exist
        if(!fs.existsSync(this.dir)){
            fs.mkdirSync(this.dir);
        }
    }

    // writing logs to files specific to user
    async writeLogs(user, message){
        console.log("----- In LoggerService writeLogs method -----");
        try{
            const filePath= `${this.dir}/${user}.txt`;

            const messageToWrite = `${new Date()} || ${message}\n`;
            
            fs.appendFileSync(filePath, messageToWrite, (err) => {
                if(err){
                    console.log("file writing failed");
                    return Promise.reject(false)
                }
            });
            this.socket.emiter("newmsg", {message: messageToWrite});

        }catch(err){
            console.error("----- Error in LoggerService writeLogs method -----");
            return Promise.reject(err);
        }
    }
}

module.exports = LoggerService;