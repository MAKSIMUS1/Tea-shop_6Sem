import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { checkAuth, fetchUserById } from "./http/userAPI";
import { Spinner } from "react-bootstrap";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";

const App = observer(() => {
    const { product } = useContext(Context);
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserAuth = async () => {
            try {
                const data = await checkAuth();
                console.log(JSON.stringify(data));
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                user.setIsAuth(true);
                const user_data = await fetchUserById(data.user_id);
                user.setUser(user_data);
                product.setUserId(data.user_id);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        checkUserAuth();
    }, [user, product]);

    if (loading) {
        return <Spinner animation={"grow"} />;
    }

    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
        </BrowserRouter>
    );
});

export default App;
