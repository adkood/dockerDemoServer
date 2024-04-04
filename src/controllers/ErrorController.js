const AppError = require("../utils/AppError");

const handleCastError = err => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(400, message);
}

const handleDuplicateField = err => {
    const value = err.keyValue.email;
    const message = `Duplicate field value: ${value}, Please use different value`;
    return new AppError(400, message);
}

const handleValidationError = err => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(400, message);
}

const handleJWTError = () => {
    return new AppError(401, 'Invalid token, Please log in again!');
}

const handleJWTExpiredError = () => {
    return new AppError(401, 'Your token has expired, Please log in again!');
}

const errorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack
    })
}

const errorProd = (err, res) => {
    // Handling operational error
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        })
    }
    else {
        //log the error
        console.error(err);

        // send general message
        res.status(500).json({
            status: "error",
            message: "Something went wrong!",
        })
    }
}

module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        errorDev(err, res);
    }
    else if (process.env.NODE_ENV === 'production') {

        // marking some mongoose error as operational errors
        let error = Object.assign({}, err);

        // CastError 
        if (err.name === 'CastError') error = handleCastError(error);

        // Duplicate database field error
        if (err.code === 11000) error = handleDuplicateField(error);

        //ValidationError
        if (err.name === 'ValidationError') error = handleValidationError(error);

        if(err.name === 'JsonWebTokenError') error = handleJWTError();

        if(err.name === 'TokenExpiredError') error = handleJWTExpiredError();

        errorProd(error, res);
    }
}