var bodyParser = require('body-parser');
mongoose = require('mongoose');
var express = require('express');
app = express();


// app config
mongoose.connect('mongodb://localhost/restful_blog_app');
app.set('view image', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


// mongoose model config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }

});

var Blog = mongoose.model("Blog", blogSchema);

// restful routes

app.get("/", function (req, res) {
    res.redirect("/blogs");

});

app.get("/blogs", function (req, res) {
    Blog.find{}, function(err, blogs) {
        if (err) {
            console.log("error");
        } else {
            res.render("index", { blogs: blogs });

        }
    };
});

// new route
app.get('/blogs/new', function(){
    res.render('new');
})
// create route
app.post("/blogs", function(req, res){
    // create blog
    Blog.create(req.body.blog, function( err, newBlog){
        if (err) {
            res.render("new");
        } else {
             // redirect to the index
           res.redirect("/blogs");
            }
        });
    });



res.render('index')






app.listen(process.env.PORT, process.env.IP, function () {
    console.log('server is running');
})

