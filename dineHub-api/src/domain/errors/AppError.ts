import { HttpStatusCode } from "../enums/HttpStatusCode";


export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string, statusCode: number, isOperational = true){
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Object.setPrototypeOf(this,new.target.prototype);
        Error.captureStackTrace(this, this.constructor)
    }
}

export class NotFoundError extends AppError {
    constructor(message: string){
        super(message, HttpStatusCode.NOT_FOUND)
    }
}

export class ValidationError extends AppError {
    constructor(message: string){
        super(message , HttpStatusCode.BAD_REQUEST)
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string){
        super(message, HttpStatusCode.UNAUTHORIZED)
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string){
        super(message, HttpStatusCode.FORBIDDEN)
    }
}

export class ConflictError extends AppError {
    constructor(message: string){
        super(message, HttpStatusCode.CONFLICT)
    }
}