import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import TagPicker from '../../../../../../../components/TagPicker.jsx';

const Tag = ({ state, setState }) => {
    return (
        <Container>
            <Row>
                <Col md={12}>
                    <TagPicker
                        selectedTags={state.tagIds}
                        setSelectedTags={(tagIds) =>
                            setState({
                                tagIds,
                            })
                        }
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default Tag;
