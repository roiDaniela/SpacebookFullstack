/**
 * Parse teh req "post" getted from clieny.
 * @param req from client.
 */
var getPostJsonFormRequest = function(postbody, username){

    var postJson = {
        text: postbody.text,
        username: username,
        comments: postbody.comments ? postbody.comments: []
    }

    return postJson;
}

module.exports.getPostJsonFormRequest = getPostJsonFormRequest;
