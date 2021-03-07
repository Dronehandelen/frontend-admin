import React from 'react';
import { Button, Card, CardBody, CardFooter, Col, Row } from 'reactstrap';

const Images = ({ primaryFileId, images, setState }) => {
    const onDelete = image => {
        setState({
            images: [...images].filter(i => i.fileId !== image.fileId),
        });
    };

    return (
        <Row>
            {images.map(image => (
                <Col md={4} lg={2} key={image.fileId} className="mb-2">
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
                </Col>
            ))}
        </Row>
    );
};

export default Images;
