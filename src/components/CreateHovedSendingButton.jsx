import React from 'react';
import { Button } from '@material-ui/core';
import mutationRequest from '../helpers/mutationRequest';
import { gql, useMutation } from '@apollo/client';

const createHovedSendingLabelForHomeSmallMutation = gql`
    mutation CreateHovedSendingLabelForHomeSmall {
        createHovedSendingLabelForHomeSmall
    }
`;

const CreateHovedSendingButton = ({ fullWidth = true }) => {
    const [createHovedSendingLabelForHomeSmall] = useMutation(
        createHovedSendingLabelForHomeSmallMutation
    );
    const [
        createHovedSendingLabelForHomeSmallStatus,
        setCreateHovedSendingLabelForHomeSmallStatus,
    ] = React.useState({
        error: false,
        loading: false,
        success: false,
    });

    return (
        <Button
            size="large"
            variant="contained"
            color="primary"
            fullWidth={fullWidth}
            className="mb-1"
            onClick={() => {
                mutationRequest(
                    setCreateHovedSendingLabelForHomeSmallStatus,
                    createHovedSendingLabelForHomeSmall,
                    {}
                );
            }}
            disabled={
                createHovedSendingLabelForHomeSmallStatus.loading ||
                createHovedSendingLabelForHomeSmallStatus.success
            }
        >
            Lag og print samlesending
            {createHovedSendingLabelForHomeSmallStatus.success &&
                ' (Vellykket)'}
        </Button>
    );
};

export default CreateHovedSendingButton;
