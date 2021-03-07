import React from 'react';
import { Alert, Button } from 'reactstrap';

const CompleteBackorder = ({
    completeBackorderStatus,
    onCompleteBackorder,
}) => {
    return (
        <div>
            <Button onClick={onCompleteBackorder}>Fullfør restordre</Button>
            {completeBackorderStatus.error && (
                <Alert className="mt-2" color="danger">
                    Noe skjedde!
                </Alert>
            )}
        </div>
    );
};

export default CompleteBackorder;
