const express=require("express");
const app=express();
const port = 8080;
const path=require("path");

app.set("views engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));

let posts=[{
            id: "1a",
            username: " Adi",
            content: "sde",
           },
           {
            id: "2b",
            username: " anni",
            content: "finance",
           },
           {
            id: "3c",
            username: " saurabh",
            content: "not assigned",
           }];

//main route
app.get("/posts",(req, res)=>{
    res.render("index.ejs", {posts});
})

//new post page route
app.get("/posts/new",(req, res)=>{
    res.render("new.ejs");
})

//adding the new post to main page
app.post("/posts", (req,res)=>{
   
    let {username, content} = req.body;
    posts.push({username, content});
    console.log(req.body);
    res.redirect("posts");
    
    // res.send("sent");
})

//routefor post with an id
app.get("/posts/:id", (req, res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id);
    res.render("show.ejs",{post});
})


//listening to 8080
app.listen(port, (req, res)=>{
    console.log("server is listening");
})
