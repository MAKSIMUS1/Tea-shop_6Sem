import { $host, $authHost } from "./index";

export const registration = async (email, password) => {
    const { data } = await $host.post('/auth/registration', { email, password, role: 'USER' });
    return data;
};

export const login = async (email, password) => {
    const { data } = await $host.post('/auth/login', { email, password });
    return data;
};

export const checkAuth = async () => {
    try {
        //console.log(`[ IN checkAuth localStorage.getItem('accessToken') ]: ${localStorage.getItem('accessToken')}`);
        const { data } = await $authHost.get('/auth/check', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        return { 
            accessToken: data.accessToken, 
            refreshToken: data.refreshToken,
            user_id: data.user_id 
        };
    } catch (error) {
        console.error(`[ERROR (http > userAPI.js > checkAuth) ]:${error}`)
        throw error;
    }
};

export const fetchUserById = async (id) => {
    const { data } = await $authHost.get(`/users/${id}`);
    return data;
};