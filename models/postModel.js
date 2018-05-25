var mongoose = require('mongoose');
Promise = require('bluebird');
mongoose.Promise = Promise;

// Schemas
let commentSchema = new mongoose.Schema({
    text: String,
    username: String,
});

let postSchema = new mongoose.Schema({
    text: String,
    username: String,
    comments: [commentSchema]
});

let Post = mongoose.model('post', postSchema)

// functions
let savePostToDB = function (postToSave) {
    var post = new Post(postToSave);

    return post.save(function (err) {
        if (err, post){
            console.log(err);
        }

        // succeeded
        return post.id;
    });
};

let updatePostToDB = function (postToUpdate) {

    var query = { _id: postToUpdate._id };
    Post.findOneAndUpdate(query, { comments: JSON.parse(postToUpdate.comments) }, {new: true}, function(err, docs){
        if (err){
            console.log(err);
        }

        // succeeded
        return postToUpdate._id;
    })
};

let deletePostFromDB = function (postId) {
    return Post.findByIdAndRemove({_id: postId}, function(err, docs){
        if(err){
          console.log(err);
        }

        // succeeded
        return true;
    });
};

let getPostFromDB = function (username) {
    return Post.find({ username: username }, function(err, posts) {
        if (err) return console.log(err);

        return posts;
    });
};

module.exports.deletePostFromDB = deletePostFromDB;
module.exports.savePostToDB = savePostToDB;
module.exports.getPostFromDB = getPostFromDB;
module.exports.updatePostToDB = updatePostToDB;

