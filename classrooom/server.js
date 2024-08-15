const express = require("express")
const app= express()
const users = require('./routes/users.js')
const posts = require("./routes/posts.js")
const session= require("express-session")
const flash= require("connect-flash")
const path  = require("path")
const sessionOptions = {
    secret :'mysupersecretstring' ,
    resave :false,
    saveUninitialized:true
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next)=>{
    res.locals.success   = req.flash("success")
   res.locals.error   = req.flash("error")
   next()
})

app.get("/register", (req, res)=>{
    let{name="anonymous"} = req.query;
    req.session.name =name;
    
    if(name=="anonymous"){

        req.flash("error", "user not register")
    }else{
        req.flash("success", "user register succesfully!")
    }
    res.redirect("/hello");
})

app.get("/hello", (req, res)=>{
   
    res.render("page.ejs", {name: req.session.name})
})

// app.get("/test", (eq, res)=>{
//     res.send("tests successful ")
// })

// app.get("/reqcount", (req, res)=>{
//     if(req.session.count){
//         req.session.count++;

//     }else {
//         req.session.count =1;
//     }
//     res.send(`you request ${req.session.count} times`);
// })
app.listen(3000, (req,res)=>{
    console.log("http://localhost:3000");
})


//cookies 
//sessions 
///sessions options
//flash