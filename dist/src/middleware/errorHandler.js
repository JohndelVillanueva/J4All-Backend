import { HTTPException } from 'hono/http-exception';
import { Prisma } from '@prisma/client';
export class CustomError extends Error {
    statusCode;
    code;
    isOperational;
    constructor(message, statusCode, code) {
        super(message);
        this.statusCode = statusCode;
        this.code = code || 'CUSTOM_ERROR';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
export const errorHandler = async (err, c) => {
    let error = { ...err };
    error.message = err.message;
    // Log error for debugging
    console.error('Error:', {
        message: err.message,
        stack: err.stack,
        url: c.req.url,
        method: c.req.method,
        timestamp: new Date().toISOString(),
    });
    // Prisma errors
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            case 'P2002':
                error = new CustomError('Duplicate field value entered', 400, 'DUPLICATE_FIELD');
                break;
            case 'P2003':
                error = new CustomError('Invalid foreign key reference', 400, 'FOREIGN_KEY_CONSTRAINT');
                break;
            case 'P2025':
                error = new CustomError('Record not found', 404, 'RECORD_NOT_FOUND');
                break;
            default:
                error = new CustomError('Database operation failed', 500, 'DATABASE_ERROR');
        }
    }
    // Prisma validation errors
    if (err instanceof Prisma.PrismaClientValidationError) {
        error = new CustomError('Invalid data provided', 400, 'VALIDATION_ERROR');
    }
    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        error = new CustomError('Invalid token', 401, 'INVALID_TOKEN');
    }
    if (err.name === 'TokenExpiredError') {
        error = new CustomError('Token expired', 401, 'TOKEN_EXPIRED');
    }
    // Cast errors (usually from MongoDB, but good to have)
    if (err.name === 'CastError') {
        error = new CustomError('Invalid ID format', 400, 'INVALID_ID');
    }
    // Validation errors
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors)
            .map((val) => val.message)
            .join(', ');
        error = new CustomError(message, 400, 'VALIDATION_ERROR');
    }
    // Default error
    if (!error.statusCode) {
        error.statusCode = 500;
        error.message = 'Internal server error';
        error.code = 'INTERNAL_SERVER_ERROR';
    }
    return c.json({
        success: false,
        message: error.message,
        code: error.code,
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
    }, error.statusCode);
};
export const notFoundHandler = (c) => {
    return c.json({
        success: false,
        message: 'Route not found',
        code: 'ROUTE_NOT_FOUND',
    }, 404);
};
// Utility function to throw operational errors
export const throwError = (message, statusCode, code) => {
    throw new CustomError(message, statusCode, code);
};
