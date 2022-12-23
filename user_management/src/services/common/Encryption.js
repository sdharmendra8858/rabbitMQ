const md5 = require("md5");

class Encryption {
    constructor(){}

    encypt(data){
        return md5(data);
    }
}

module.exports = Encryption;