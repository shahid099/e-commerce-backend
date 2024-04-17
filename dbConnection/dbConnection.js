import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
// FUNCTION FOR CONNECTION TO MONGODB
export const ConnectionFunction = ()=> {
    try {
        mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        const connection = mongoose.connection;
        connection.once('open', () => {
            console.log('MongoDB database connection established successfully');
          });
    } catch (error) {
        console.log(error, error.message);
    }
}