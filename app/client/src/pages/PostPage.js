import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { fetchOnePost } from '../http/postAPI';

const PostPage = () => {
    const [selectedPost, setSelectedPost] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postData = await fetchOnePost(id);
                setSelectedPost(postData);
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };
        fetchData();
    }, [id]);

    return (
        <Container className="mt-3">
            <Row>
                <Col>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + selectedPost?.image} />
                    <h1>{selectedPost?.title}</h1>
                    <p>{selectedPost?.content}</p>
                    {/* Дополнительные поля, если необходимо */}
                </Col>
            </Row>
        </Container>
    );
};

export default PostPage;
