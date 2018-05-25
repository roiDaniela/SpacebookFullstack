import PostsRepository from './posts-repository.js';
import PostsRenderer from './posts-renderer.js';
import EventsHandler from './events-handler.js';

// Wait to PostsRepository do Async call
var postsRepository = new PostsRepository();
postsRepository.init(function() {
    let postsRenderer = new PostsRenderer();
    let eventsHandler = new EventsHandler(this, postsRenderer);
    eventsHandler.registerAddPost();
    eventsHandler.registerRemovePost();
    eventsHandler.registerToggleComments();
    eventsHandler.registerAddComment();
    eventsHandler.registerRemoveComment();
    postsRenderer.renderPosts(this.posts);
});