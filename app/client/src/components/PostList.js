import React, { useContext, useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Row, Col, FormControl, Button } from "react-bootstrap";
import PostItem from "./PostItem";

const PostList = observer(() => {
    const { post } = useContext(Context);
    const [searchKeyword, setSearchKeyword] = useState("");

    useEffect(() => {
        post.fetchPosts();
    }, [post]);

    const handleSearch = async () => {
        await post.searchPosts(searchKeyword);
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
        <Row>
            {post.posts.map(post =>
                <Col key={post.id} md={4}>
                    <PostItem post={post} />
                </Col>
            )}
        </Row>
        </div>
    );
});

export default PostList;
