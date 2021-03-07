import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import ProductPicker from '../../../components/ProductPicker.jsx';

const ProductModal = ({ isOpen, onClose, onAdd }) => {
    const [products, setProducts] = React.useState([]);

    return (
        <Modal isOpen={isOpen} toggle={onClose}>
            <ModalHeader toggle={onClose}>Set inn video</ModalHeader>
            <ModalBody>
                <ProductPicker
                    maxCount={1}
                    selectedProducts={products}
                    setSelectedProducts={setProducts}
                    colProps={{ xs: 12, md: 12 }}
                />
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    onClick={() => {
                        if (products.length !== 0) {
                            onAdd({ productId: products[0].id });
                        }
                    }}
                >
                    Velg
                </Button>{' '}
                <Button color="secondary" onClick={onClose}>
                    Avbryt
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ProductModal;
