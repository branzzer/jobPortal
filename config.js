const mongoose = require('mongoose')


const connectDb = async (uri) => {

    try {
        await mongoose.connect(uri);
        console.log("connected to database")


    } catch (error) {
        console.log(`Error at connectDb ERROR => ${error}`);
    }


}


module.exports = connectDb






