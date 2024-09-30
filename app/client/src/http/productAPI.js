import { $authHost, $host } from "./index";

export const createCategory = async (categories) => {
    const { data } = await $authHost.post('categories', categories);
    return data;
};

export const fetchCategories = async () => {
    const { data } = await $host.get('categories');
    return data;
};

export const createProduct = async (product) => {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('category_id', product.category_id);
    formData.append('image', product.file);

    try {
        const { data } = await $authHost.post('products', formData);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const fetchOneProduct = async (productId) => {
    try {
        const response = await $authHost.get(`/products/${productId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product:", error);
        throw error; // Re-throw the error to handle it in the component
    }
};

export const fetchProducts = async () => {
    const { data } = await $host.get('products');
    return data;
};

export const fetchCategoryById = async (categoryId) => {
    const { data } = await $authHost.get(`/categories/${categoryId}`);
    return data;
};

export const createOrder = async (orderData) => {
    try {
        const response = await $host.post('/orders', orderData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const createOrderItems = async (orderId, cart) => {
    try {
        const orderItemsPromises = cart.map(item => {
            const orderItemData = {
                orderId: orderId,
                productId: item.product_id,
                quantity: item.quantity
            };
            return $host.post('/order-items', orderItemData);
        });
        await Promise.all(orderItemsPromises);
        return;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};


export const getUserOrders = async (userId) => {
try {
    const response = await $host.get(`/orders/user/${userId}`);
    const orders = response.data;
    
    const ordersWithItems = await Promise.all(orders.map(async (order) => {
      const itemsResponse = await $host.get(`/order-items/order/${order.orderId}`);
      const items = itemsResponse.data;
      return { ...order, items };
    }));

    return ordersWithItems;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw new Error('Failed to fetch user orders');
  }
};

export const removeOrderItem = async (itemId) => {
    try {
        const response = await $host.delete(`/order-items/${itemId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const editOrderItemQuantity = async (itemId, newQuantity) => {
    try {
        const response = await $host.put(`/order-items/${itemId}`, { quantity: newQuantity });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const sendConfirmationCode = async (orderId) => {
    try {
        const response = await $authHost.post(`/order-confirmations/${orderId}/send-confirmation-code`);
        return response.data;
    } catch (error) {
        throw new Error(`Error sending confirmation code: ${error.message}`);
    }
};

export const confirmOrderCode = async (orderId, confirmationCode) => {
    try {
        const response = await $authHost.post(`/order-confirmations/${orderId}/confirm`, { confirmationCode });
        return response.data;
    } catch (error) {
        throw new Error(`Error confirming order: ${error.message}`);
    }
};

export const resendConfirmationCode = async (orderId) => {
    try {
        const response = await $authHost.post(`/order-confirmations/${orderId}/resend-confirmation-code`);
        return response.data;
    } catch (error) {
        throw new Error(`Error resending confirmation code: ${error.message}`);
    }
};

export const searchProductsReq = async (keyword) => {
    try {
        const response = await $host.get(`/products/search-products?keyword=${keyword}`);
        return response.data;
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        throw new Error('Ошибка при выполнении запроса');
    }
};

export const createPost = async (post) => {
    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('content', post.content);
    formData.append('userId', post.userId);
    formData.append('image', post.file);

    try {
        const { data } = await $authHost.post('posts', formData);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updatePost = async (post) => {
    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('content', post.content);
    formData.append('userId', post.userId);
    formData.append('image', post.file);

    try {
        const { data } = await $authHost.put('posts', formData);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateProduct = async (id, product) => {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('category_id', product.category_id);
    formData.append('image', product.file);

    try {
        const { data } = await $authHost.put(`products/${id}`, formData);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};