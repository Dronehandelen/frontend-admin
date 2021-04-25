import React from 'react';
import { Button, Card, CardBody, CardFooter } from 'reactstrap';
import { Grid } from '@material-ui/core';

const Images = ({ primaryFileId, images, setState }) => {
    const onDelete = (image) => {
        setState({
            images: [...images].filter((i) => i.fileId !== image.fileId),
        });
    };

    return (
        <Grid container spacing={1}>
            {images.map((image) => (
                <Grid item md={4} key={image.fileId}>
                    <Card>
                        <CardBody>
                            <img
                                src={image.url}
                                alt=""
                                style={{
                                    maxWidth: '100%',
                                }}
                            />
                        </CardBody>
                        <CardFooter>
                            <Button
                                className="mr-1"
                                color="danger"
                                onClick={() => onDelete(image)}
                            >
                                X
                            </Button>
                            {image.fileId !== primaryFileId && (
                                <Button
                                    onClick={() =>
                                        setState({
                                            primaryFileId: image.fileId,
                                        })
                                    }
                                >
                                    Primærbilde
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default Images;
