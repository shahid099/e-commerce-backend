import express from 'express';
// import body-parser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
const app = express();
app.use(express.json({ limit: '50mb' }));
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
dotenv.config();
// FUNCTONS INPORTS
import { ConnectionFunction } from './dbConnection/dbConnection.js';
import productsDataroute from './Routes/productsDataroute.js'
ConnectionFunction();

// MY ROUTES
app.use('/', productsDataroute);
// app.use('/', productsDataroute);



app.listen(PORT ,()=> {
    console.log(`The Server is Running on Port:${PORT}`);
})

