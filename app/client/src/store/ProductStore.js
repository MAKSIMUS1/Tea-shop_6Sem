import {makeAutoObservable} from "mobx";
import { searchProductsReq } from '../http/productAPI';

export default class ProductStore {
    constructor() {
        this._categories = [];
        this._products = [];
        this._selectedCategory = {};
        this._page = 1;
        this._totalCount = 0;
        this._limit = 3;
        this._userId = null; 
        this._cart = JSON.parse(localStorage.getItem(`cart_${this._userId}`)) || [];
        makeAutoObservable(this)
    }

    setCategories(categories) {
        this._categories = categories
    }
    
    setProducts(products) {
        this._products = products
    }

        setSelectedCategory(category) {
            //this.setPage(1)

            if (this._selectedCategory === category) {
                this._selectedCategory = {};
                this.searchProducts('');
            } else {
                this._selectedCategory = category;
                const filteredProducts = this._products.filter(product => product.category_id === category.category_id);
                this.setProducts(filteredProducts);
            }
        }
        
    
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    setUserId(userId) {
        this._userId = userId;
    }

    addToCart(product) {
        const updatedCart = [...this._cart, product];
        this._cart.replace(updatedCart);
        localStorage.setItem(`cart_${this._userId}`, JSON.stringify(updatedCart));
    }
    
    removeFromCart(productId) {
        const updatedCart = this._cart.filter(product => product.product_id !== productId);
        this._cart.replace(updatedCart);
        localStorage.setItem(`cart_${this._userId}`, JSON.stringify(updatedCart));
    }
    
    initCartFromLocalStorage() {
        const cartData = JSON.parse(localStorage.getItem(`cart_${this._userId}`)) || [];
        this._cart.replace(cartData);
    }
    
    searchProducts(keyword){
        searchProductsReq(keyword)
            .then(products => {
                this.setProducts(products);
            })
            .catch(error => {
                console.error('Ошибка при выполнении запроса:', error);
            });
    }

    get categories() {
        return this._categories
    }
    get brands() {
        return this._brands
    }
    get products() {
        return this._products
    }
    get selectedCategory() {
        return this._selectedCategory
    }
    
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
    
    get cart() {
        return this._cart;
    }
    get userId() {
        return this._userId;
    }
}