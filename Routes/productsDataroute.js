import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
const router = express.Router();
dotenv.config();
import Product from '../Models/productsDatamodel.js';
import upload from '../middlewares/multer.js';

// Multer
// const uploads = multer({ dest: __dirname + "/uploads" });


// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// ROUTE TO GET THE SAVED DATA FROM THE DATABASE

    router.get('/product', async (req, res)=> {
      try {
          let proudcts = await Product.find();
          res.send({ proudcts })
          
      } catch (error) {
          console.error(error.message);
          res.status(500).send({error: "Internal Server error"})
      }
  })
    // Post Route to take data and save it to Database Mongodb Upload the Image data to Cloudinary
  router.post('/additems', upload.array('imageData'), async (req, res)=> {
    try {
        // Getting the String type data from the multer using req.body
        const { descriptionData, catagoryData, barcodeData, itemskuData, stockofItemsData } = req.body;
        // Getting files type data from the multer using req.files
        // req.files is the object
        const imagedata = req.files;
        // We want the path from the Object 
        const imageIs = imagedata[0].path;
        // Uploading Image data to Cloudinary
        const photourl = await cloudinary.uploader.upload(imageIs, (err, image)=> {
            if(err) { console.error("Error uploading image", err); }
            console.log("Image Uploaded to Cloudinary", image);
         });
        //  Creating data According to Schema and Saving to Database
         const newProduct = await Product.create({
            imageData: photourl.url,
            descriptionData,
            catagoryData,
            barcodeData,
            itemskuData,
            stockofItemsData
         });

         await newProduct.save();
         res.status(201).json({success: true, message: 'Post Created successfully', data: newProduct });
         console.log(newProduct);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({success: false, message: "Unable to create a post, Please try again", error: "Internal server error"});
    }
  })
  

export default router;
