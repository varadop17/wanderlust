const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");





app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname, "public")));






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

// app.get("/testListing",async(req,res)=>{
//     let sampleListing = new Listing({
//         title :"My new villa",
//         description : "bt the beach",
//         price : 1200,
//         location :"Calangute, Goa",
//         country:"India",
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");

// });



// Index Route
app.get("/listings",async (req,res)=>{
      const allListings = await Listing.find({});
      res.render("listings/index", { allListings });

});

// new Route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});

// Create Route
app.post("/listings",async (req,res)=>{
     const newListing = new Listing(req.body.listing);
     await newListing.save();
     res.redirect("/listings");

});

//update route
app.put("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listings");
});

//Edit route
app.get("/listings/:id/edit",async (req,res)=>{
    let {id} = req.params;
     let listing = await Listing.findById(id);
      res.render("listings/edit.ejs",{ listing });
});
// Show Route
app.get("/listings/:id",async (req,res)=>{
     let {id} = req.params;
     let listing = await Listing.findById(id);
     res.render("listings/show.ejs",{ listing });
});

//delete Route
app.delete("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})


app.listen(8080,()=>{
    console.log("Server is Listening to port 8080");
});