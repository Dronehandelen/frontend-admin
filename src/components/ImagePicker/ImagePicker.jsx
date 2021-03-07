import React from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import ImagesComponent from './Images.jsx';
import AddImageModal from '../AddImageModal';

const ImagePicker = ({
    images,
    primaryImageId,
    setImages,
    setPrimaryId,
    enableMultiSelection = false,
    enablePrimarySelection,
}) => {
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
                images={images}
                primaryFileId={primaryImageId}
                setPrimaryId={setPrimaryId}
                enablePrimarySelection={enablePrimarySelection}
                setImages={setImages}
            />
            <AddImageModal
                isOpen={addImageModalIsOpen}
                onAdd={(images) => {
                    if (enableMultiSelection) {
                        setImages(
                            [...images, ...images].filter(
                                (x, i, o) =>
                                    o.findIndex(
                                        (oi) => oi.fileId === x.fileId
                                    ) === i
                            )
                        );
                    } else {
                        setImages(images);
                    }

                    setAddImageModalIsOpen(false);
                }}
                onClose={() => setAddImageModalIsOpen(false)}
                single={!enableMultiSelection}
            />
        </Container>
    );
};

export default ImagePicker;
