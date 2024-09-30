// OrderPage.js

import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { getUserOrders, removeOrderItem, editOrderItemQuantity, sendConfirmationCode, confirmOrderCode, resendConfirmationCode } from '../http/productAPI';
import OrderList from '../components/OrderList';
import EditOrderModal from '../components/modals/EditOrderModal';

const OrderPage = observer(() => {
    const { user } = useContext(Context);
    const [orders, setOrders] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const fetchedOrders = await getUserOrders(user.user.user_id);
                setOrders(fetchedOrders);
            } catch (error) {
                console.error('Error fetching user orders:', error.message);
            }
        };
        fetchOrders();
    }, [user.user.user_id]);

    const handleEditOrder = (orderId) => {
        const order = orders.find(order => order.orderId === orderId);
        setSelectedOrder(order);
        setModalVisible(true);
    };

    const handleConfirmOrder = async (orderId) => {
        try {
            await sendConfirmationCode(orderId);
            const updatedOrders = await getUserOrders(user.user.user_id);
            setOrders(updatedOrders);
            console.log('Order with id', orderId, 'confirmed successfully');
        } catch (error) {
            console.error('Error confirming order:', error.message);
        }
    };

    const handleCodeConfirm = async (orderId, confirmationCode) => {
        try {
            const response = await confirmOrderCode(orderId, confirmationCode);

            if (response.confirmed_at) {
                alert(`Заказ успешно подтвержден! Дата: ${response.confirmed_at}`);
                const updatedOrders = await getUserOrders(user.user.user_id);
                setOrders(updatedOrders);
            } else {
                alert('Ошибка подтверждения заказа: ' + response.message);
            }
        } catch (error) {
            console.error('Ошибка при подтверждении заказа:', error.message);
            alert('Ошибка при подтверждении заказа. Попробуйте еще раз.');
        }
    };

    const handleNewCode = async (orderId) => {
        try {
            const response = await resendConfirmationCode(orderId);

            if (response.orderId === orderId) {
                alert(`Отправлен новый код.`);
                const updatedOrders = await getUserOrders(user.user.user_id);
                setOrders(updatedOrders);
            } else {
                alert('Ошибка подтверждения заказа: ' + response.message);
            }
        } catch (error) {
            console.error('Ошибка при подтверждении заказа:', error.message);
            alert('Ошибка при подтверждении заказа. Попробуйте еще раз.');
        }
    };
    
    const handleRemoveItem = async (itemId) => {
        try {
            await removeOrderItem(itemId);
            const updatedOrders = await getUserOrders(user.user.user_id);
            setOrders(updatedOrders);
            console.log('Item with id', itemId, 'removed successfully');
        } catch (error) {
            console.error('Error removing item:', error.message);
        }
    };

    const handleEditQuantity = async (itemId, newQuantity) => {
        try {
            await editOrderItemQuantity(itemId, newQuantity);
            const updatedOrders = await getUserOrders(user.user.user_id);
            setOrders(updatedOrders); 
            console.log('Item with id', itemId, 'updated successfully');
        } catch (error) {
            console.error('Error editing item quantity:', error.message);
        }
    };

    return (
        <Container className="mt-3">
            <h2>Список заказов</h2>
            <OrderList 
            orders={orders} 
            onEdit={handleEditOrder} 
            onConfirm={handleConfirmOrder} 
            onCodeConfirm={handleCodeConfirm}
            onNewCodeConfirm={handleNewCode}/>
            <EditOrderModal 
                show={modalVisible} 
                onHide={() => setModalVisible(false)} 
                order={selectedOrder} 
                onRemoveItem={handleRemoveItem} 
                onEditQuantity={handleEditQuantity} 
            />
        </Container>
    );
});

export default OrderPage;
