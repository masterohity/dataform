const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path")


const app = express();

app.use(bodyparser.urlencoded({extended:true}));

const uri = mongoose.connect("mongodb://127.0.0.1:27017/reportDb").then(() => console.log("Sucessfully connected to report databases")).catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    weight: Number,
    email: String,
    upload: String
});

const User = new mongoose.model("User", userSchema);








app.get("/", function(req, res){
    res.sendFile(path.join(__dirname +"/index.html"));
});

app.post("/", function(req, res){
    const user = new User ({
        name: req.body.name,
        age: req.body.age,
        weight: req.body.weight,
        email: req.body.email,
        upload: req.body.upload
    });

    user.save().then(item => {
      res.send("item saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});


app.get("/:email", function(req, res){
    const email = req.params.email;

    if(uri.connect == res.status(200)){
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        const db = uri.db("reportDb");
  
        const healthReport = db.collection("user").findOne({ email: email });
  
        if (healthReport) {
          res.contentType("application/pdf");
          res.send(healthReport.upload);
        } else {
          res.sendStatus(404);
        }
      }
   } });
  
  
 



app.listen(3000, function(req, res){
    console.log("Server is running on Port 3000");
});