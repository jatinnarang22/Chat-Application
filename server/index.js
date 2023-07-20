const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const app = express();
const port = 5000;
const User=require('./Models/User');
const auth= require("./routes/auth");

    //connection with mongodb
    mongoose.set('strictQuery',true);
    mongoose.connect('mongodb://127.0.0.1:27017/chatdata')
    .then(()=>{
        console.log("DB is connected");
    })
    .catch((err)=>{
        console.log(err);
    });

//middleware
// app.use(cors());

app.set("views",path.join(__dirname,"view"));
app.use(express.urlencoded({extended:true}));  
app.use(express.json());     // it parses the incoming request with jSON 
app.use(auth);
app.use(User);


// connection to start the server
app.listen(port,()=>{
    console.log(`server connected at port ${port}`);
});
