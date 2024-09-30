import React, { useContext, useEffect } from 'react';
import { Container, Table, Button, Image } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { createOrder, createOrderItems } from "../http/productAPI";

const Basket = observer(() => {
  const { product } = useContext(Context);

    useEffect(() => {
        product.initCartFromLocalStorage();
    }, [product]);

    const handleRemoveFromCart = (productId) => {
        product.removeFromCart(productId);
    };

    const handleIncreaseQuantity = (productId) => {
  };

  const handleDecreaseQuantity = (productId) => {
  };

  const handleCheckout = async () => {
    try {
      const orderData = {
          userId: product._userId,
          status: 'created',
          items: product.cart.map(item => ({
            productId: item.product_id,
            quantity: item.quantity
        }))
        };
        const createdOrder = await createOrder(orderData);
        console.log(`createdOrder.id: ${createdOrder.orderId}`);
        await createOrderItems(createdOrder.orderId, product.cart);
        alert('Заказ успешно оформлен!');
        //product.clearCart();
    } catch (error) {
        alert(`Ошибка при оформлении заказа: ${error.message}`);
    }
};
    const calculateTotalPrice = () => {
        return product.cart.reduce((total, product) => total + product.price, 0);
    };

    return (
        <Container className="mt-3">
            <h2>Корзина</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Изображение</th>
                        <th>Название</th>
                        <th>Цена</th>
                        <th>Итого</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {product.cart.map((product, index) => (
                        <tr key={product.product_id}>
                            <td>{index + 1}</td>
                            <td><Image src={process.env.REACT_APP_API_URL + product.image_url} width={50} height={50} /></td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.price * product.quantity}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleRemoveFromCart(product.product_id)}>Удалить</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <h4>Итого: {calculateTotalPrice()} руб.</h4>
            <Button variant="primary" onClick={handleCheckout}>Осуществить заказ</Button>
       </Container>
    );
});

export default Basket;
