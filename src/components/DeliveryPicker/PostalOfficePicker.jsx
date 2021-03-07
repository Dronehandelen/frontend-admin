import React from 'react';
import { Alert, FormGroup, Input, Label, Spinner } from 'reactstrap';
import { gql, useQuery } from '@apollo/client';

const GET_POSTAL_OFFICES_QUERY = gql`
    query GetPostalOffices($postalCode: String!) {
        postalOffices(postalCode: $postalCode) {
            id
            name
        }
    }
`;

const PostalOfficePicker = ({
    postalCode,
    postalOfficeId,
    setPostalOfficeId,
}) => {
    const { loading, error, data } = useQuery(GET_POSTAL_OFFICES_QUERY, {
        variables: {
            postalCode,
        },
    });

    React.useEffect(() => {
        if (!data) {
            return;
        }

        if (
            postalOfficeId &&
            data.postalOffices.some(
                (postalOffice) => postalOffice.id === postalOfficeId
            )
        ) {
            return;
        }

        setPostalOfficeId(data.postalOffices[0].id);
    }, [data, postalOfficeId, setPostalOfficeId]);

    return (
        <>
            {loading && <Spinner />}
            {error && <Alert color="danger">Noe skjedde</Alert>}
            {data && (
                <FormGroup>
                    <Label>Velg leveringsted</Label>
                    <Input
                        type="select"
                        value={postalOfficeId}
                        onChange={(e) =>
                            setPostalOfficeId(parseInt(e.target.value))
                        }
                    >
                        {data.postalOffices.map((postalOffice) => (
                            <option
                                value={postalOffice.id}
                                key={postalOffice.id}
                            >
                                {postalOffice.id} - {postalOffice.name}
                            </option>
                        ))}
                    </Input>
                </FormGroup>
            )}
        </>
    );
};

export default PostalOfficePicker;
