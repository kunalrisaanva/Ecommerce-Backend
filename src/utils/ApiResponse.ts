class ApiResponse{
    constructor(public statucCode:number ,public data:object ,public success = true, public message = "Success" ){
        this.statucCode = statucCode,
        this.data = data,
        this.success = success,
        this.message = message
    }
}


export { ApiResponse }