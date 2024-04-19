const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const app = express()
const port = 8080

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken")

mongoose.connect("mongodb+srv://iyaemile4:iyaemile4@cluster0.nqavw6t.mongodb.net/",
    // {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
    // }
).then(() => {
    console.log("Database connected")
}).catch((err)=>{
    console.log("Error while connection to MongoDB",err)
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})