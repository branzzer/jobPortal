const errorHandlerMiddleware = (err, req, res, next) => {

    // console.log(`inside errorHandlerMiddleware ${err}`)
    //console.log(err)

    const defaultErrors = {
        statusCode: 500,
        message: err
    }



    //missing field error
    if (err.name === 'ValidationError') {
        defaultErrors.statusCode = 400;

        defaultErrors.message = Object.values(err.errors).map(error => error.message).join(',')

    }

    //duplicate key 
    if (err.code && err.code === 11000) {
        console.log(`${Object.keys(err.keyValue)}`)
        defaultErrors.message = `${Object.keys(err.keyValue)} field has to be unique`;
    }

    res.status(defaultErrors.statusCode).json({ message: defaultErrors.message })

}

module.exports = errorHandlerMiddleware