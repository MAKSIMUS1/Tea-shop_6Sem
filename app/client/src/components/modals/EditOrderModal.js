import React, { useEffect, useState } from 'react';
import { Modal, Button, Image } from 'react-bootstrap';
import { fetchOneProduct } from '../../http/productAPI'; // Подставьте ваш метод для получения информации о продукте

const EditOrderModal = ({ show, onHide, order, onRemoveItem, onEditQuantity }) => {
    const [productInfo, setProductInfo] = useState([]);

    useEffect(() => {
        if (order && order.items) {
            const fetchProductInfo = async () => {
                const products = await Promise.all(order.items.map(async (item) => {
                    const product = await fetchOneProduct(item.productId);
                    return { ...product, quantity: item.quantity, orderItem: item };
                }));
                setProductInfo(products);
            };
            fetchProductInfo();
        }
    }, [order]);

    const handleRemoveItem = (orderId) => {
        onRemoveItem(orderId);
        onHide();
    };

    const handleEditQuantity = (itemId, currentQuantity) => {
        const newQuantity = prompt('Введите новое количество:', currentQuantity);
        if (newQuantity !== null && !isNaN(newQuantity) && newQuantity >= 0 && newQuantity <= 100) {
            onEditQuantity(itemId, newQuantity);
            onHide();
        } else {
            alert('Введите корректное количество от 0 до 100');
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Изменение заказа</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Элементы заказа:</h4>
                <ul>
                    {productInfo.map((product, index) => (
                        <li key={index}>
                            <span>{product.name}</span>
                            <span> | Цена: {product.price}</span>
                            <span> | Количество: {product.quantity}</span>
                            <Button variant="danger" onClick={() => handleRemoveItem(product.orderItem.order_item_id)}>Удалить</Button>
                            <Button variant="primary" onClick={() => handleEditQuantity(product.orderItem.order_item_id, product.quantity)}>Изменить количество</Button>
                            <Image src={process.env.REACT_APP_API_URL + product.image_url} width={50} height={50} />
                        </li>
                    ))}
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditOrderModal;
