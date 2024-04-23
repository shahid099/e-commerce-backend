import mongoose from 'mongoose';
const productsSchema = new mongoose.Schema({
    imageData: String,
    descriptionData: String,
    catagoryData: String,
    barcodeData: String,
    itemskuData: String,
    stockofItemsData: String,
    itemPrice: String,
});

const productsData = mongoose.model('productsData', productsSchema);
export default productsData;