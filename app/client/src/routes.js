import Admin from "./pages/Admin";
import {ADMIN_ROUTE, BASKET_ROUTE, PRODUCT_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, ORDERS_ROUTE, POST_ROUTE, CHAT_ROUTE} from "./utils/consts";
import Basket from "./pages/Basket";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import ProductPage from "./pages/ProductPage";
import PostPage from "./pages/PostPage";
import OrderPage from "./pages/OrderPage";
import ChatPage from "./pages/ChatPage";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
    {
        path: CHAT_ROUTE,
        Component: ChatPage
    },
    {
        path: ORDERS_ROUTE,
        Component: OrderPage
    }
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: ProductPage
    },
    {
        path: POST_ROUTE + '/:id',
        Component: PostPage
    },
]