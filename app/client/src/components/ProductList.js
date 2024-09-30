import React, { useContext, useState } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Row, FormControl, Button } from "react-bootstrap";
import ProductItem from "./ProductItem";

const ProductList = observer(() => {
    const { product } = useContext(Context);
    const [searchKeyword, setSearchKeyword] = useState("");

    const handleSearch = async () => {
        await product.searchProducts(searchKeyword);
    };

    return (
        <div>
            <Row className="d-flex">
                <FormControl
                    type="text"
                    placeholder="Поиск по имени"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <Button variant="primary" onClick={handleSearch}>Поиск</Button>
            </Row>
            <Row className="d-flex">
                {product.products.map(product =>
                    <ProductItem key={product.product_id} product={product}/>
                )}
            </Row>
        </div>
    );
});

export default ProductList;
