import React from 'react';
import { Col, Container, FormGroup, Row } from 'reactstrap';
import Editor from '../../../../../../../libraries/Editor';

const Description = ({ state, setState }) => {
    return (
        <Container>
            <Row>
                <Col md={12}>
                    <FormGroup>
                        <Editor
                            editorState={state.description}
                            onChange={(state) =>
                                setState({
                                    description: state,
                                })
                            }
                        />
                    </FormGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default Description;
