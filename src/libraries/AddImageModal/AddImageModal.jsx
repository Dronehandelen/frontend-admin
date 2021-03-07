import React from 'react';
import {
    Button,
    Col,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
} from 'reactstrap';
import ImageCard from './components/ImageCard';

const AddImageModal = ({
    isOpen,
    onClose,
    onAdd,
    onUpload,
    images,
    selectedImageFileIds,
    single,
    onImageClick,
}) => {
    const fileInput = React.useRef(null);

    return (
        <Modal isOpen={isOpen} toggle={onClose} size="lg">
            <input
                type="file"
                ref={fileInput}
                style={{ display: 'none' }}
                onChange={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    onUpload(event.target.files);
                }}
                accept="image/jpeg,image/png"
                multiple={!single}
            />
            <ModalHeader toggle={onClose}>Modal title</ModalHeader>
            <ModalBody>
                <Row>
                    {images.map((image) => {
                        const selected =
                            selectedImageFileIds.findIndex(
                                (x) => x.fileId === image.node.fileId
                            ) !== -1;

                        return (
                            <Col
                                md={2}
                                key={image.node.fileId}
                                className="mb-2"
                            >
                                <ImageCard
                                    image={image.node}
                                    selected={selected}
                                    onClick={() => onImageClick(image)}
                                />
                            </Col>
                        );
                    })}
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    onClick={() => fileInput.current.click()}
                >
                    Upload new image
                </Button>
                <Button color="primary" onClick={onAdd}>
                    Add
                </Button>
                <Button color="secondary" onClick={onClose}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default AddImageModal;
