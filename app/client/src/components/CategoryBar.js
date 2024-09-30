import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import ListGroup from 'react-bootstrap/ListGroup';

const CategoryBar = observer(() => {
    const { product } = useContext(Context);

    return (
        <ListGroup> 
            {product.categories.map(category => (
                <ListGroup.Item
                    style={{ cursor: 'pointer' }}
                    active={category.category_id === product.selectedCategory.category_id}
                    onClick={() => product.setSelectedCategory(category)}
                    key={category.category_id}
                >
                    {category.name}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
});

export default CategoryBar;
