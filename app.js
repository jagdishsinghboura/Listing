if(process.env.NODE_ENV!="production"){
    require("dotenv").config()
}


const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const methodOverride = require("method-override")
const ejsMate = require('ejs-mate')
const ExpressError = require("./utils/ExpressError.js")
const session = require("express-session")
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local")
const User = require("./models/user.js")

const listingRouter = require("./routes/listing.js")
const reviewRouter = require("./routes/review.js")
const userRouter = require("./routes/user.js")

main().then((res) => console.log(`connection successful :${res}`)).catch((err) => console.log(`connection failed : ${err}`))

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
}


const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")))

const sessionOptions = {
    secret: "supersecretstriing",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
}


app.get("/", (req, res) => {
    res.send("Home")
})

app.use(session(sessionOptions))
app.use(flash());

app.use(passport.initialize())//initialize the passport as a middleware
app.use(passport.session())//for creating a session  so user whenever send a request to server he dosent need every time login 
passport.use(new LocalStrategy(User.authenticate()))//for authenticate user we use this funtcion 

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.curUser =req.user;
    next();
})

app.get("/demouser", async (req, res, next)=>{
    let fakeUser =  new User({
        email:"student@gmail.com",
        username:"student"
    });

    const registerUser =await User.register(fakeUser, "hellowworld");
    res.send(registerUser)
})


app.use("/listings", listingRouter)
app.use("/listings/:id/reviews", reviewRouter)
app.use("/", userRouter)


app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"))
})

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "something went wrong" } = err;
    // res.status(statusCode).send(message);
    res.render("error.ejs", { err })
})

app.listen(8080, (req, res) => {
    console.log("http://localhost:8080/listings")
})


// app.get("/testListing", async (req,res)=>{
//     let sampleListing= new Listing({
//         title:"my Home Villa",
//         description:"by the beach ",
//         price:1200,
//         location:"rishikesh",
//         country:"india"
//     })

//     // await sampleListing.save();

//     console.log(typeof sampleListing);
//     res.send("succesuful saved ")
// })