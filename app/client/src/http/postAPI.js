import { $authHost, $host } from "./index";

export const fetchOnePost = async (productId) => {
    try {
        const response = await $authHost.get(`/posts/${productId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching post:", error);
        throw error;
    }
};

export const fetchPosts = async () => {
    const { data } = await $host.get('posts');
    return data;
};

export const searchPostsReq = async (keyword) => {
    try {
        const response = await $host.get(`/posts/search-posts?keyword=${keyword}`);
        return response.data;
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        throw new Error('Ошибка при выполнении запроса');
    }
};