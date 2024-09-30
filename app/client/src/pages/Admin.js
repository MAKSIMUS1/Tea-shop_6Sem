import React, { useState } from 'react';
import { Button, Container } from "react-bootstrap";
import CreateProduct from "../components/modals/CreateProduct";
import CreateCategory from "../components/modals/CreateCategory";
import EditProduct from "../components/modals/EditProduct";
import CreatePost from "../components/modals/CreatePost";
//import UpdatePost from "../components/modals/UpdatePost";

const Admin = () => {
    const [categoryVisible, setCategoryVisible] = useState(false);
    const [productVisible, setProductVisible] = useState(false);
    const [editProductVisible, setEditProductVisible] = useState(false);
    const [postVisible, setPostVisible] = useState(false);

    return (
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setCategoryVisible(true)}
            >
                Добавить категорию
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setProductVisible(true)}
            >
                Добавить товар
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setEditProductVisible(true)}
            >
                Изменить товар
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setPostVisible(true)}
            >
                Добавить статью
            </Button>
            <CreateCategory show={categoryVisible} onHide={() => setCategoryVisible(false)}/>
            <CreateProduct show={productVisible} onHide={() => setProductVisible(false)}/>
            <EditProduct show={editProductVisible} onHide={() => setEditProductVisible(false)} />
            <CreatePost show={postVisible} onHide={() => setPostVisible(false)} />
        
        </Container>
    );
};

export default Admin;