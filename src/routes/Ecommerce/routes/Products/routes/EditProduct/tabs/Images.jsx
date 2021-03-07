import React from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import ImagesComponent from '../components/Images';
import AddImageModal from '../../../../../../../libraries/AddImageModal';

const Images = ({ state, setState }) => {
    const [addImageModalIsOpen, setAddImageModalIsOpen] = React.useState(false);

    return (
        <Container>
            <Row className="mb-2">
                <Col md={12}>
                    <Button onClick={() => setAddImageModalIsOpen(true)}>
                        Add
                    </Button>
                </Col>
            </Row>
            <ImagesComponent
                images={state.images}
                primaryFileId={state.primaryFileId}
                setState={setState}
            />
            <AddImageModal
                isOpen={addImageModalIsOpen}
                onAdd={(images) => {
                    setState({
                        images: [...state.images, ...images].filter(
                            (x, i, o) =>
                                o.findIndex((oi) => oi.fileId === x.fileId) ===
                                i
                        ),
                    });
                    setAddImageModalIsOpen(false);
                }}
                onClose={() => setAddImageModalIsOpen(false)}
            />
        </Container>
    );
};

export default Images;
