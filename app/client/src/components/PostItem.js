import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { POST_ROUTE } from "../utils/consts";

const PostItem = ({ post }) => {
    const navigate = useNavigate();

    const handlePostClick = () => {
        navigate(POST_ROUTE + '/' + post.id);
    };

    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.content}</Card.Text>
                <Button variant="primary" onClick={handlePostClick}>
                    Подробнее
                </Button>
            </Card.Body>
        </Card>
    );
};

export default PostItem;
