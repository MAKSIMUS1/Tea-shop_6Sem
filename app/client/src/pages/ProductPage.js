import React, { useEffect, useState, useContext } from 'react';
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { fetchOneProduct, fetchCategoryById } from "../http/productAPI";
import { Context } from "../index";

const ProductPage = () => {
    const { user } = useContext(Context);
    const { product: productStore } = useContext(Context);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [category, setCategory] = useState(null);
    const { id } = useParams();
    
    const quantity = 1;

    useEffect(() => {
        const fetchData = async () => {
            try {
                productStore.setUserId(user.user.user_id);
                const productData = await fetchOneProduct(id);
                setSelectedProduct(productData);
                const categoryData = await fetchCategoryById(productData.category_id);
                setCategory(categoryData);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchData();
    }, [id, productStore, user.user.user_id]);

    const addToCart = () => {
        if (selectedProduct) {
            const productWithQuantity = { ...selectedProduct, quantity };
            console.log(productWithQuantity.product_id);
            const isProductInCart = productStore.cart.some(item => item.product_id === productWithQuantity.product_id);
            if (isProductInCart) {
                alert(`Товар ${productWithQuantity.name} уже в корзине.`);
            } else {
                productStore.addToCart(productWithQuantity);
                console.log(`Product ${productWithQuantity.name} added to cart`);
            }
        }
    };
    

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + selectedProduct?.image_url} />
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{selectedProduct?.name}</h2>
                        <p>{selectedProduct?.description}</p>
                        <p>Категория: {category?.name}</p>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{ width: 300, height: 300, fontSize: 32, border: '5px solid lightgray' }}
                    >
                        <h3>Цена: {selectedProduct?.price} BYN.</h3>
                        <Button variant={"outline-dark"} onClick={addToCart}>Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductPage;
