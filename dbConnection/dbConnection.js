import mongoose from "mongoose";
// FUNCTION FOR CONNECTION TO MONGODB
export const ConnectionFunction = ()=> {
    const URL = 'mongodb+srv://shahid099:SHAHIDMUHAMMAD099@cluster0.fo6kffm.mongodb.net/?retryWrites=true&w=majority'
    try {
        mongoose.connect(URL);
        const connection = mongoose.connection;
        connection.once('open', () => {
            console.log('MongoDB database connection established successfully');
          });
    } catch (error) {
        console.log(error, error.message);
    }
}
