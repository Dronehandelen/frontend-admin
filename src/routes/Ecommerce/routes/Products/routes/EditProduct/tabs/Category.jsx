import React from 'react';
import { Container, Row } from 'reactstrap';
import CategoryPicker from '../../../../../../../components/CategoryPicker/CategoryPicker.jsx';

const Category = ({ state, setState }) => {
    return (
        <Container>
            <Row>
                <CategoryPicker
                    selectedCategories={state.categoryIds}
                    setSelectedCategories={(categoryIds) =>
                        setState({
                            categoryIds,
                        })
                    }
                />
            </Row>
        </Container>
    );
};

export default Category;
