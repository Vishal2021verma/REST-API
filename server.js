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



app.get("/articles", function(req,res){
    Article.find(function(err, foundArticle){
        res.send(foundArticle);

    });
});

app.post("/articles" , function(req, res){
    console.log(req.body.title);
    console.log(req.body.content);

    const newArticle = new Article({
        title:req.body.title,
        content: req.body.content
    });
    newArticle.save(function(err){
        if(!err){
            res.status(200).send("Article Saved Successful");
        }
    });

});
app.listen(3000, function(){
    console.log("Server started on port 3000..");
});