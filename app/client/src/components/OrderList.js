import React from 'react';
import { Table } from 'react-bootstrap';
import OrderItem from './OrderItem';

const OrderList = ({ orders, onEdit, onConfirm, onCodeConfirm, onNewCodeConfirm }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Дата заказа</th>
                    <th>Статус</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order, index) => (
                    <OrderItem key={order.orderId} 
                    order={order} 
                    onEdit={onEdit} 
                    onConfirm={onConfirm} 
                    onCodeConfirm={onCodeConfirm} 
                    onNewCodeConfirm={onNewCodeConfirm} />
                ))}
            </tbody>
        </Table>
    );
};

export default OrderList;
