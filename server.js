const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended :true
}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/restDB", {useNewUrlParser: true});

const articleSchema = new mongoose.Schema({
    title: String,
    content:String

});

const Article = mongoose.model("Article", articleSchema);
const myObj = [
    {title: "REST", content: "REST is short for Representational State Transfer. It's an architectural style for desingning APIs. " },
    {title: "API", content: "API stands for Aplication Proggramming Interface. It is a set of subroutine definitions, comunication protocals, and tools for building Software."},
    {title: "Bootstrap", content: "This is a framework developed by Twitter that contains pre-made front-end templates for web design"}
]

// Article.insertMany(myObj,function(err){
//     if(!err) console.log("Save");
// });

app.get("/articles", function(req,res){
    Article.find(function(err, foundArticle){
        res.send(foundArticle);

    });
});
app.listen(3000, function(){
    console.log("Server started on port 3000..");
});