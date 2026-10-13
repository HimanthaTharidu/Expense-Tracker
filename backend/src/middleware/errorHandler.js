const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode || 500;
    const message = err.message;

    console.log(`[Error] ${statusCode} - ${message}`);

    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: message,
        stack: process.env.NODE_ENV === 'development'? err.stack : undefined
    });
}

export default errorHandler