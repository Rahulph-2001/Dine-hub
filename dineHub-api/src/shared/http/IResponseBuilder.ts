export interface SuccessResponse<T>{
    statusCode: number;
    body: {
        success: true;
        message: string;
        data: T
    }
}

export interface ErrorResponse {
    statusCode: number;
    body: {
        success: false;
        message: string;
        error: {
            code: string;
            message: string
        }
    }
}

export interface IResponseBuilder {
    success<T>(data: T, message: string, statusCode?: number): SuccessResponse<T>
    error(message: string, code: string, statusCode?: number): ErrorResponse;
}