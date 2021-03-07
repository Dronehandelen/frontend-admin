import React from 'react';
import {
    Button,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap';
import request from '../../../../helpers/request.js';

const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    return await request({
        method: 'post',
        url: '/files',
        data: formData,
    });
};

const FileUpload = ({ onClose, onAdd }) => {
    const [file, setFile] = React.useState(null);
    const [title, setTitle] = React.useState(null);

    return (
        <Modal isOpen={true} toggle={onClose}>
            <ModalHeader toggle={onClose}>Modal title</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label>Tittel</Label>
                    <Input
                        type="text"
                        name="title"
                        placeholder="Tittel"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </FormGroup>
                <input
                    type="file"
                    onChange={(event) => {
                        event.stopPropagation();
                        event.preventDefault();
                        setFile(event.target.files[0]);
                    }}
                />
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    onClick={() => {
                        uploadFile(file)
                            .then((dbFile) => {
                                onAdd({
                                    src: dbFile.url,
                                    title,
                                });
                            })
                            .catch(() => {});
                    }}
                >
                    Add
                </Button>
                <Button color="secondary" onClick={onClose}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default FileUpload;
