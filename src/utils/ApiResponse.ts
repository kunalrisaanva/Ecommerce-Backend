class ApiResponse{
    constructor(statucCode , data , success = true, message = "Success" ){
        this.statucCode = statucCode,
        this.data = data,
        this.success = success,
        this.message = message
    }
}


export { ApiResponse }