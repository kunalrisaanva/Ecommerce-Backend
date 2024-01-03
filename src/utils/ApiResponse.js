class ApiResponse{
    constructor(statucCode , data , success = Boolean, message = "Success" ){
        this.statucCode = statucCode,
        this.data = data,
        this.success = success,
        this.message = message
    }
}


export { ApiResponse }