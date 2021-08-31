export class AppError {
    statusCode?: number
    status: string
    isOperational: boolean
    field: null | string
    message: string

    constructor(field: null | string, message: string, statusCode?: number) {
        this.statusCode = statusCode || 500
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
        this.isOperational = true
        this.field = field
        this.message = message
    }
}
