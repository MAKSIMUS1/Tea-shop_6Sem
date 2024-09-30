import React from 'react';
import { Card, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "../utils/consts";

const ProductItem = ({ product }) => {
    const navigate = useNavigate();

    return (
        <Col md={4} className="mb-4">
            <Card className="h-100" onClick={() => navigate(PRODUCT_ROUTE + '/' + product.product_id)} style={{ cursor: 'pointer' }}>
                <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                        <Image src={process.env.REACT_APP_API_URL + product.image_url} rounded fluid />
                    </div>
                    <div className="text-black-50 mt-3">
                        <div className="mb-2">{product.name}</div>
                        <div className="d-flex align-items-center">
                            <div>{product.rating}</div>
                        </div>
                    </div>
                    <div className="font-weight-bold">{product.price}</div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default ProductItem;
