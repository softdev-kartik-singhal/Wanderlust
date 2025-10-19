const mongoose = require("mongoose");
const initialData = require("./data.js");
const Listing = require("../models/listing.js");


main().then(() => {
    console.log("connected to DB");
}).catch((err) => {
    console.log(err);
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/Wanderlust")
}


const initDB = async() => {
    await Listing.deleteMany({});
    initialData.data = initialData.data.map((obj) => ({...obj , owner:"68eaa5a211ae1218b154a805"}))
    await Listing.insertMany(initialData.data);
    console.log("data was initialized");
}

initDB();