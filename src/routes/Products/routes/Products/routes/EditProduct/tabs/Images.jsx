import React from 'react';
import ImagesComponent from '../components/Images';
import AddImageModal from '../../../../../../../libraries/AddImageModal';
import { Box, Button, Grid } from '@material-ui/core';

const Images = ({ state, setState }) => {
    const [addImageModalIsOpen, setAddImageModalIsOpen] = React.useState(false);

    return (
        <Grid container>
            <Grid component={Box} item xs={12} marginBottom={1}>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => setAddImageModalIsOpen(true)}
                >
                    Add
                </Button>
            </Grid>
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
        </Grid>
    );
};

export default Images;
