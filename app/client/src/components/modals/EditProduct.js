import React, { useContext, useState, useEffect } from 'react';
import { Modal, Button, Dropdown, Form } from 'react-bootstrap';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';
import { fetchCategories, fetchProducts, updateProduct } from "../../http/productAPI";

const EditProduct = observer(({ show, onHide }) => {
    const { product } = useContext(Context);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [newName, setNewName] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newFile, setNewFile] = useState(null);
    const [newCategoryId, setNewCategoryId] = useState('');

    useEffect(() => {
        fetchCategories().then(data => product.setCategories(data));
        fetchProducts().then(data => product.setProducts(data))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const selectNewFile = e => {
        setNewFile(e.target.files[0]);
    }

    const handleProductSelect = (product) => {
        console.log(product);
        setSelectedProduct(product);
        setNewName(product.name);
        setNewDescription(product.description);
        setNewPrice(product.price);
        setNewCategoryId(product.category_id);
    };

    const handleSaveChanges = () => {
        console.log('save changes 1');
        if (!selectedProduct || !newName || !newPrice || !newDescription || !newCategoryId) {
            return;
        }
        console.log('save changes 2');

        updateProduct(selectedProduct.product_id, { name: newName, description: newDescription, price: newPrice, image: newFile, category_id: newCategoryId });
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {selectedProduct ? `${selectedProduct.name} - ${selectedProduct.price}` : 'Select Product'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {product.products.map(product => (
                            <Dropdown.Item key={product.product_id} onClick={() => handleProductSelect(product)}>
                                {product.name} - {product.price}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formImage">
                        <Form.Label>Image</Form.Label>
                        <Form.Control className="mt-3" type="file" onChange={(e) => selectNewFile(e.target.value)}/>
                    </Form.Group>
                    <Dropdown className="mt-3">
                        <Dropdown.Toggle>
                            {product.categories.find(category => category.category_id === newCategoryId)?.name || "Select Category"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {product.categories.map(category =>
                                <Dropdown.Item
                                    key={category.category_id}
                                    onClick={() => setNewCategoryId(category.category_id)}
                                >
                                    {category.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default EditProduct;
