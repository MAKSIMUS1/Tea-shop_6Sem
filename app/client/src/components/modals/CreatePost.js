import React, { useState, useContext } from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import { Context } from "../../index";
import { createPost } from "../../http/productAPI";
import { observer } from "mobx-react-lite";

const CreatePost = observer(({ show, onHide }) => {
    const { product } = useContext(Context);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [userId, setUserId] = useState('');

    const selectFile = e => {
        setFile(e.target.files[0]);
    }

    const addPost = async () => {
        setUserId(product.userId)
        const formData = {
            title,
            content,
            userId,
            file
        };
        try {
            await createPost(formData);
            onHide();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить статью
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="mt-3"
                        placeholder="Введите заголовок статьи"
                    />
                    <Form.Control
                        as="textarea"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        className="mt-3"
                        placeholder="Введите содержание статьи"
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addPost}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreatePost;
