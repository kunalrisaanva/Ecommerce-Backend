class ApiResponse{
    constructor(statucCode , data , success , message = "Success" ){
        this.statucCode = statucCode,
        this.data = data,
        this.success = success,
        this.message = message
    }
}