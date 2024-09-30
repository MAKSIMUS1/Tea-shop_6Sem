import { makeAutoObservable } from 'mobx';
import { fetchPosts, fetchOnePost, searchPostsReq } from '../http/postAPI';

export default class PostStore {
    posts = [];
    selectedPost = null;

    constructor() {
        makeAutoObservable(this);
    }

    setPosts(posts) {
        this.posts = posts;
    }

    setSelectedPost(post) {
        this.selectedPost = post;
    }

    async fetchPosts() {
        try {
            const posts = await fetchPosts();
            this.setPosts(posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    async fetchOnePost(id) {
        try {
            const post = await fetchOnePost(id);
            this.setSelectedPost(post);
        } catch (error) {
            console.error(`Error fetching post with id ${id}:`, error);
        }
    }

    searchPosts(keyword){
        searchPostsReq(keyword)
            .then(posts => {
                this.setPosts(posts);
            })
            .catch(error => {
                console.error('Ошибка при выполнении запроса:', error);
            });
    }
}