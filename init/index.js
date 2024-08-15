const mongoose= require("mongoose")
const initData= require("./data.js");
const Listing = require("../models/listing.js")
const data = require("./data.js")

main().then((res)=>console.log(`connection successful :${res}`)).catch((err)=>console.log(`connection failed : ${err}`))

async function main(){
   await  mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
}

const initDB = async ()=>{
    await Listing.deleteMany({})
    initData.data= initData.data.map((obj)=>({...obj, owner:'665379c4d2005c61b7cf667b'}));
    await Listing.insertMany(initData.data)
    console.log("data is initialized")
}

initDB()