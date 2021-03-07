import React from 'react';
import {
    Button,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap';
import getYouTubeID from 'get-youtube-id';

const YouTubeModal = ({ isOpen, onClose, onAdd }) => {
    const [url, setUrl] = React.useState('');
    const [isYoutubeLinkInvalid, setIsYoutubeLinkInvalid] = React.useState(
        false
    );

    return (
        <Modal isOpen={isOpen} toggle={onClose}>
            <ModalHeader toggle={onClose}>Set inn video</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label>Youtube link</Label>
                    <Input
                        type="text"
                        name="youtubeVideoId"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        invalid={isYoutubeLinkInvalid}
                    />
                    {isYoutubeLinkInvalid && (
                        <FormFeedback>Linken er ikke gyldig</FormFeedback>
                    )}
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    onClick={() => {
                        const youTubeId = getYouTubeID(url);

                        setIsYoutubeLinkInvalid(!youTubeId);

                        if (!youTubeId) {
                            return;
                        }

                        onAdd({ youTubeId });
                    }}
                >
                    Last opp
                </Button>{' '}
                <Button color="secondary" onClick={onClose}>
                    Avbryt
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default YouTubeModal;
