const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message;

    console.log(`[Error] ${statusCode} - ${message}`);

    res.status(statusCode).json({
        sucess: false,
        status: statusCode,
        message: message,
        stack: process.env.NODE_ENV === 'development'? err.stack : {}
    });
}

export default errorHandler