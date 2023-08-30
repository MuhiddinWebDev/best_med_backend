const winston = require('winston');
function errorMiddleware(error, req, res, next) {
    let { status = 500, message, data } = error;

    console.log(`[Error] ${error}`);
    winston.error(error.message, error);

    // If status code is 500 - change the message to Intrnal server error
    message = status === 500 || !message ? 'Serverdagi xatolik' : message;
    let error_code = status;
    status = 200;
    error = {
        error_code,
        error: true,
        message,
        ...(data) && data
    }

    res.status(status).send(error);
}

module.exports = errorMiddleware;
/*
{
    type: 'error',
    status: 404,
    message: 'Not Found'
    data: {...} // optional
}
*/