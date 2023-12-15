import express from 'express';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
// FUNCTONS INPORTS
import  { ConnectionFunction }  from './dbConnection/dbConnection.js'
ConnectionFunction();


const server =  app.listen(PORT ,()=> {
    console.log(`The Server is Running on Port ${PORT}`);
})
