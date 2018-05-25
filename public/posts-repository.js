/**
 * @class Responsible for storing and manipulating Spacebook posts, in-memory
 */
// Private Method
const privateMethods = {
    updatePost (postIndex) {
        var postToSend = Object.create(this.posts[postIndex]);
        postToSend.comments = JSON.stringify(postToSend.comments);
        $.ajax('/updatePost', {
            method: "POST",
            data: postToSend,
            success: function(data) {
                console.log(data);
            },
            error: function(data) {
                console.log('Error: ' + data);
            }
        });
    }
}

class PostsRepository {
    constructor () {
        this.posts = [];
    }

    init (callback) {
        // do async get data and call the callback:
        var that = this;
        $.get({
            url: "/posts",
            // beforeSend: function() {
            //     // setting a timeout
            //     $(placeholder).addClass('loading');
            //     i++;
            // },
            success: function(data){
                that.posts = data;
                callback.bind(that)();
            }
        });
    }

    addPost(postText) {
        var postJsonToSend = { text: postText, comments: [] };
        this.posts.push(postJsonToSend);

        $.ajax('/addPost', {
            method: "POST",
            data: postJsonToSend,
            success: function(data) {
                postJsonToSend._id = data;
            },
            error: function(data) {
                console.log('Error: ' + data);
            }
        });
    }

    removePost(index) {
        var postId = this.posts[index]._id;
        this.posts.splice(index, 1);
        $.get({
            url: "/delete?id="+postId,
            success: function(data){
                console.log(data);
            }
        });
    }
    
    addComment(newComment, postIndex) {
        this.posts[postIndex].comments.push(newComment);
        privateMethods.updatePost.call(this, postIndex);
    };

    deleteComment(postIndex, commentIndex) {
        this.posts[postIndex].comments.splice(commentIndex, 1);
        privateMethods.updatePost.call(this, postIndex);
      };
}

export default PostsRepository