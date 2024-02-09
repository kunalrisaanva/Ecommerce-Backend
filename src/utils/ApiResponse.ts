class ApiResponse{
    constructor(public statucCode:number ,public data:object, public message = "Success" , public success = true ){
        this.statucCode = statucCode,
        this.data = data,
        this.success = success,
        this.message = message
    }
}


export { ApiResponse }