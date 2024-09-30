import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import CategoryBar from '../components/CategoryBar';
import ProductList from '../components/ProductList';
import PostList from '../components/PostList';
import { fetchCategories, fetchProducts } from '../http/productAPI';
const Shop = observer(() => {
    const {product} = useContext(Context);
    const { post: postStore } = useContext(Context);

    useEffect(() => {
        fetchCategories().then(data => product.setCategories(data))
        fetchProducts().then(data => product.setProducts(data))
        postStore.fetchPosts();
    }, [postStore, product])

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <CategoryBar/>
                </Col>
                <Col md={9}>
                    <ProductList/>  
                </Col>
            </Row>
            <Row className="mt-2">
                <Col md={12}>
                    <PostList/>  
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;