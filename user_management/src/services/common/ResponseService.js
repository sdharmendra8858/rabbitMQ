class ResponseService {
    constructor(){}

    successResponse(data){
        return {
            "status": "SUCCESS",
            "message": data.message ? data.message : "",
            "user_id": data.user_id ? data.user_id : "",
            ...(data.hasOwnProperty("email") && {"email": data.email}),
            ...(data.hasOwnProperty("tokens") && {"tokens": data.tokens})
        }
    }
}

module.exports = ResponseService;