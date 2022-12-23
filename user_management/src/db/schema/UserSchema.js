const { Schema } = require("mongoose");

const userSchema = new Schema({
    "user_id": {
        type: String,
        required: true
    },
    "name": String,
    "email": {
        type: String,
        required: true
    },
    "password": {
        type: String,
        required: true,
        select: false
    },
    "messages": [{
        message: String,
        created_at: Date
    }],
    "tokens": [{
        token: {
            type: String,
            required: true
        }
    }]
},{
    timestamps: true
})

module.exports = userSchema;