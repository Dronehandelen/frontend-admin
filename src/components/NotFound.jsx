import React from 'react';
import styled from 'styled-components';
import { Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';

const Mascot = styled.div`
    img {
        max-width: 100%;
        max-height: 30vh;
    }
`;

const NotFound = () => {
    return (
        <Container>
            <Row className="justify-content-center">
                <Col className="text-center" md={5}>
                    <Mascot>
                        <img src="/character.png" alt="character" />
                    </Mascot>
                    <h2>404 Ikke funnet</h2>
                    <p>Forespurt side ble ikke funnet</p>
                    <p>
                        Vi har nettopp lansert nettsiden på nytt igjen og det
                        kan derfor være noe lenke som ikke er gyldig lenger.
                    </p>
                    <Link to="/">Gå til landingssiden</Link>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFound;
