const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const app = express()
const port = 8000
const cors = require('cors');
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

const User = require('./models/user');
const Order = require('./models/order');
// function to send verfication email to the user

const sendverificationEmail = async (email, verificationToken) => {
    // create a nodemailer transporter
console.log("verifying email")
    const transporter = nodemailer.createTransport({
        //configure nodemailer
        service: "gmail",
        auth: {
            user: "iyaemile4@gmail.com",
            pass: "xssi lnkb dzcy ixot"// to be get from  .env
        }
    });
    //compose the email message
    const mailOptions = {
        from: "Ekorana app shop",
        to: email,
        subject: "Email Verification",
        text: `pleaseclick the following link to verify your email: http://localhost:8000/verify/${verificationToken}`
    };
    // send the email
    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch {
        console.log("Error while sending verification email", error);
    }
}

//endpoints to registerin app
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // first I want to check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }
        // hashing password before it been stored in database

        // creating new user
        const newUser = new User({
            name,
            email,
            password,
        });
        // generate verification token
        newUser.verificationToken = crypto.randomBytes(20).toString("hex");
        // save the user to the database
        await newUser.save();

        // send verification email to user
        sendverificationEmail(newUser.email, newUser.verificationToken);

        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        console.log("error while registering user", error.body);
        res.status(500).json({ message: "registration failed" });
    }
})

// End point to verify email
app.get("/verify/:token", async (req, res) => {
    try {
        const token = req.params.token;
        //finduser whith given verfication token
        const user = await User.findOne({ verificationToken: token });

        // if token is not found
        if (!user) {
            return res.status(404).json({ message: "Invalid verfication token" });
        }

        // if token is found
        // set verified to true
        user.verified = true;

        // remove verification token
        user.verificationToken = undefined;

        // update user
        // save user
        await user.save();

        // send success response
        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        console.log("error while verifying user", error);
        res.status(500).json({ message: "verification failed" });
    }
})

const generateSecretkey = () => {
    const secretkey = crypto.randomBytes(31).toString("hex");
    return secretkey;
}
const secretKey = generateSecretkey();
// endpoint to login the user
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        //check if user exist
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email" });
        }
        //check password
        
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }
        // //check if user is verified
        // if (!user.verified) {
        //     return res.status(401).json({ message: "Email not verified" });
        // }
        
        //generate JWT token
        const token = jwt.sign({ userId: user._id }, secretKey);
        res.status(200).json({ token });
    } catch (error) {
        console.log("error while login", error);
        res.status(500).json({ message: "login failed" });
    }
})