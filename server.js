var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var basicAuth = require('basic-auth-connect');

const SERVER_PORT = 8080;
var username;

mongoose.connect('mongodb://localhost/spacebookDB', {useMongoClient: true}, function() {
    console.log("DB connection established!!!");
});

var Post = require('./models/postModel');
var RequestParser = require('./helpers/RequestParser');

var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(basicAuth(function(user, pass){
    username = user;
    return 'spacebook' == pass;
}))

// You will need to create 5 server routes
// These will define your API:

// 1) to handle getting all posts and their comments
// 2) to handle adding a post
// 3) to handle deleting a post
// 4) to handle adding a comment to a post
// 5) to handle deleting a comment from a post

app.listen(process.env.PORT || SERVER_PORT, () => {
    console.log("Server started on port " + SERVER_PORT);
});

// Connect to Spacebook DataBase
mongoose.connect(process.env.CONNECTION_STRING || 'mongodb://localhost/spacebookDB');

// route get posts
app.get('/posts', function (req, res) {
  Post.getPostFromDB(username).then(function(posts){
      res.send(posts);
  });
});

// route save post
app.post('/addPost', function (req, res) {
  var postJson = RequestParser.getPostJsonFormRequest(req.body, username);

  // save success
  var post_id = Post.savePostToDB(postJson);
  if(post_id){
      res.send(post_id);
  }
});

// route update post
app.post('/updatePost', function (req, res) {
    var postJson = req.body;

    // save success
    var post_id = Post.updatePostToDB(postJson);
    if(post_id){
        res.send("post updated");
    }
});
// route for deleting a post
// ?id=<post_id_to_delete>
app.get('/delete', function(req, res){
  if(Post.deletePostFromDB(req.query.id)){
      res.send("remove success");
  }
});
