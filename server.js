const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const { request } = require('express');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/restDB", { useNewUrlParser: true });

const articleSchema = new mongoose.Schema({
    title: String,
    content: String

});

const Article = mongoose.model("Article", articleSchema);
///////////////////////////////// request for all article

app.route("/articles").get(function (req, res) {
    Article.find(function (err, foundArticle) {
        res.send(foundArticle);

    });
})
    
    .post(function (req, res) {
        console.log(req.body.title);
        console.log(req.body.content);

        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });

        newArticle.save(function (err) {
            if (!err) {
                res.status(200).send("Article Saved Successful");
            }
        });
    }) 
    
    .delete(function (req, res) {
        Article.deleteMany(function (err) {
            if (!err) {
                res.send("Successfully deleted all articles");
            } else {
                res.send(err);
            }
        });
    })

//////////////////////////////////////request for specific aritcle

app.route("/articles/:articleTitle").get(function(req,res){
    Article.findOne({title:req.params.articleTitle},function(err, foundArticle){
        if(foundArticle){
            res.status(200).send(foundArticle);
        }
        else{
            res.status(200).send("No Article found.");
        }
    })

})
.put(function(req,res){
    console.log(req.params.articleTitle);
    Article.updateOne(
        {title: req.params.articleTitle },
        {title: req.body.title, content: req.body.content},
        function(err){
            if(!err){
                res.send("Successfully updated article.");
            }else{
                res.send(err);
            }
        }
    );
}).patch(function(req,res){
    Article.updateOne(
        {title: req.params.articleTitle},
        {$set:req.body},
        function(err){
            if(!err){
                res.send("Updated Successfully")
            }else{
                res.send(err);
            }
        }
    );
}).delete(function(req, res){
    Article.deleteOne(
        {title: req.params.articleTitle},
        function(err){
            if(!err){
                res.send("Article is deleted successfully");
            }else{
                res.send(err);

            }
        }
    );
});


app.listen(3000, function () {
    console.log("Server started on port 3000..");
});