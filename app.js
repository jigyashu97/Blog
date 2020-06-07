//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// lodash contains lowerCase method
const _ =require("lodash");
// array of all the posts added
const posts=[];
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
// setting ejs for use
app.set('view engine', 'ejs');
// needed to start using bodyParser
app.use(bodyParser.urlencoded({extended: true}));
// to send css and other files to the server they are put in a folder called public
app.use(express.static("public"));
// handling request of home page
app.get("/",function(req,res){
  // sending title and content using EJS
    res.render("home",{HOME:"Home",CONTENT:homeStartingContent,POSTS:posts});
})
app.get("/about",function(req,res){
  res.render("about",{HOME:"About",CONTENT:aboutContent});
})
app.get("/contact",function(req,res){
  res.render("contact",{HOME:"Contact",CONTENT:contactContent});
})
app.get("/compose",function(req,res){
  res.render("compose",{HOME:"Compose"});
})
app.post("/compose",function(req,res){
  // creating a javascript object to store title and content of the blog posted using compose page
  const post={
    title:req.body.Title,
    Body:req.body.bodytext
  };
  posts.push(post);
  // getting back to homepage as soon as  new blog is published
  res.redirect("/");
  //console.log(post);
})
app.get("/posts/:topic",function(req,res){
  for(var i=0;i<posts.length;i++){
    let lower= _.lowerCase(posts[i].title);
    // comparing actual title with one after /posts/title after converting to lowercase and removing -/ other characters
  if(lower===_.lowerCase(req.params.topic)){
    res.render("post",{head:posts[i].title,charbody:posts[i].Body});
  }
  else{
    res.render("title not found!");
  }
}
})










app.listen(3000, function() {
  console.log("Server started on port 3000");
});
