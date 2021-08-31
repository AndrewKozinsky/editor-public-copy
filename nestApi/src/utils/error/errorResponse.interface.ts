// Server error response type
export interface ErrorResponseInterface {
    status: 'fail',
    statusCode: number,
    errors?: { [key: string]: string[] } // Messages object with field names and arrays its errors
    commonError?: string // Common message relating to the entire form
}
