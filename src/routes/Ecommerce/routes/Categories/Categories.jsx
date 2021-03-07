import React from 'react';
import {
    Button,
    Col,
    Container,
    Input,
    InputGroup,
    InputGroupAddon,
    Row,
} from 'reactstrap';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import sort from './sort.js';
import Category from './CategoryContainer.jsx';

const Categories = ({ categories, categoryMutation }) => {
    const [categoryName, setCategoryName] = React.useState('');

    return (
        <Container>
            <Row>
                <Col>
                    <InputGroup>
                        <Input
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            placeholder="lag ny tag group"
                        />
                        <InputGroupAddon addonType="append">
                            <Button
                                color="secondary"
                                onClick={() => {
                                    categoryMutation({
                                        category: {
                                            name: categoryName,
                                        },
                                    });

                                    setCategoryName('');
                                }}
                            >
                                Legg til
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col className="mb-3">
                    <DndProvider backend={HTML5Backend}>
                        {sort(categories).map((category, index) => (
                            <Category
                                key={`${index}-${category.id}`}
                                category={category}
                                parentCategoryId={null}
                                categoryMutation={categoryMutation}
                            />
                        ))}
                    </DndProvider>
                </Col>
            </Row>
        </Container>
    );
};

export default Categories;
