import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const OrderItem = ({ order, onEdit, onConfirm, onCodeConfirm, onNewCodeConfirm }) => {
    const [confirmationCode, setConfirmationCode] = useState('');

    const handleEdit = () => {
        onEdit(order.orderId);
    };
    const handleConfirm = () => {
        onConfirm(order.orderId);
    };
    const handleCodeConfirm = () => {
        onCodeConfirm(order.orderId, confirmationCode);
    };
    const handleNewCodeConfirm = () => {
        onNewCodeConfirm(order.orderId);
    };
    
    const handleChange = (e) => {
        setConfirmationCode(e.target.value);
    };
    return (
        <tr>
            <td>{order.orderId}</td>
            <td>{order.order_date}</td>
            <td>{order.status}</td>
            <td>
                {order.status === 'created' && (
                    <>
                        <Button variant="info" onClick={handleEdit}>Изменить</Button>
                        <Button variant="success" onClick={handleConfirm}>Подтвердить</Button>
                    </>
                )}
                {order.status === 'awaiting_confirmation' && (
                    <div>
                        <Form.Control 
                            type="text" 
                            placeholder="Введите код подтверждения" 
                            value={confirmationCode} 
                            onChange={handleChange} 
                        />
                        <Button variant="success" onClick={handleCodeConfirm}>Подтвердить заказ</Button>
                        <Button variant="outline-dark" onClick={handleNewCodeConfirm}>Выслать новый код</Button>
                    </div>
                )}
            </td>
        </tr>
    );
};

export default OrderItem;
