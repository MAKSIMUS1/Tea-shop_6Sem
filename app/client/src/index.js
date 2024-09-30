import React, {createContext} from 'react'
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./store/UserStore";
import ProductStore from "./store/ProductStore";
import PostStore from "./store/PostStore";

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context.Provider value={{
        user: new UserStore(),
        product: new ProductStore(),
        post: new PostStore()
    }}>
        <App />
    </Context.Provider>
  </React.StrictMode>
);

