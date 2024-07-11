const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

const MONGO_URL ="mongodb://127.0.0.1:27017/wanderlust";
async function main(){
    await mongoose.connect(MONGO_URL);
}
main().then(()=>{
    console.log("connected to DB");
}).catch(err=>{
    console.log(err);
});



app.get("/",(re,res)=>{
    res.send("Hi, im root");
});

app.get("/testListing",async(req,res)=>{
    let sampleListing = new Listing({
        title :"My new villa",
        description : "bt the beach",
        price : 1200,
        location :"Calangute, Goa",
        country:"India",
    });
    await sampleListing.save();
    console.log("sample was saved");
    res.send("successful testing");

});

app.listen(8080,()=>{
    console.log("Server is Listening to port 8080");
});