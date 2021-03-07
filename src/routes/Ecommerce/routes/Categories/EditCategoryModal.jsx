import React from 'react';
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap';

const EditCategoryModal = ({ categoryToEdit, onEdit, onClose }) => {
    const [name, setName] = React.useState('');
    const [displayInHeader, setDisplayInHeader] = React.useState('');

    React.useEffect(() => {
        if (categoryToEdit) {
            setName(categoryToEdit.name);
            setDisplayInHeader(categoryToEdit.displayInHeader);
        } else {
            setName('');
            setDisplayInHeader('');
        }
    }, [categoryToEdit]);

    const onSubmit = async () => {
        onEdit({
            id: categoryToEdit.id,
            category: {
                name,
                displayInHeader,
            },
        }).then(onClose);
    };

    return (
        <Modal isOpen={!!categoryToEdit}>
            <ModalHeader>Endre kategori</ModalHeader>
            <ModalBody>
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                >
                    <FormGroup>
                        <Label>Navn</Label>
                        <Input
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input
                                type="checkbox"
                                checked={displayInHeader}
                                onChange={() =>
                                    setDisplayInHeader(!displayInHeader)
                                }
                            />{' '}
                            Vis i header
                        </Label>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={onSubmit}>
                    Lagre
                </Button>{' '}
                <Button color="secondary" onClick={onClose}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default EditCategoryModal;
