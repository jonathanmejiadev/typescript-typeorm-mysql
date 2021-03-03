export class HttpException extends Error {
    public httpStatus: number
    public title: string
    public message: string
    constructor(statusCode: number, message: string, title: string) {
        super(message)
        this.httpStatus = statusCode;
        this.message = message
        this.title = title
    }
};