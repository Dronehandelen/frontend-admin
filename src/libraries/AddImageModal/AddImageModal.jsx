import React from 'react';
import ImageCard from './components/ImageCard';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
} from '@material-ui/core';

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
        <Dialog maxWidth="lg" open={isOpen} onClose={onClose} scroll="body">
            <DialogTitle onClose={onClose}>Legg til bilde</DialogTitle>
            <DialogContent dividers>
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
                <Grid container>
                    {images.map((image) => {
                        const selected =
                            selectedImageFileIds.findIndex(
                                (x) => x.fileId === image.node.fileId
                            ) !== -1;

                        return (
                            <Grid
                                item
                                md={2}
                                key={image.node.fileId}
                                className="mb-2"
                            >
                                <ImageCard
                                    image={image.node}
                                    selected={selected}
                                    onClick={() => onImageClick(image)}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => fileInput.current.click()}
                >
                    Upload new image
                </Button>
                <Button color="primary" variant="contained" onClick={onAdd}>
                    Add to product
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddImageModal;
