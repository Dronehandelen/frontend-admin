import React from 'react';
import { Col, Container, FormGroup, Input, Label, Row } from 'reactstrap';
import ManagedFormGroup from '../../../../../../../components/ManagedFormGroup.jsx';
import ImagePicker from '../../../../../../../components/ImagePicker';

const Meta = ({ state, setState, error }) => {
    return (
        <Container>
            <Row>
                <Col md={12}>
                    <ImagePicker
                        images={state.headerImage ? [state.headerImage] : []}
                        setImages={(images) =>
                            setState({
                                headerImage:
                                    images.length === 0 ? null : images[0],
                            })
                        }
                    />
                    <ManagedFormGroup error={error} inputKey="title">
                        {(errors) => (
                            <>
                                <Label>Tittel</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    placeholder="Tittel"
                                    value={state.title}
                                    onChange={(e) =>
                                        setState({
                                            title: e.target.value,
                                        })
                                    }
                                    invalid={!!errors}
                                />
                            </>
                        )}
                    </ManagedFormGroup>
                    <ManagedFormGroup error={error} inputKey="SEODescription">
                        {(errors) => (
                            <>
                                <Label>Beskrivelse for SEO</Label>
                                <Input
                                    type="textarea"
                                    name="SEODescription"
                                    value={state.SEODescription}
                                    onChange={(e) =>
                                        setState({
                                            SEODescription: e.target.value,
                                        })
                                    }
                                    invalid={!!errors}
                                />
                            </>
                        )}
                    </ManagedFormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input
                                type="checkbox"
                                checked={state.isPublished}
                                onChange={() =>
                                    setState({
                                        isPublished: !state.isPublished,
                                    })
                                }
                            />{' '}
                            Is published?
                        </Label>
                    </FormGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default Meta;
