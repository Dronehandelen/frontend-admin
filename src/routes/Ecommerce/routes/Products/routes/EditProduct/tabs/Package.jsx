import React from 'react';
import { Col, Container, Input, Label, Row } from 'reactstrap';
import ManagedFormGroup from '../../../../../../../components/ManagedFormGroup.jsx';

const Package = ({ state, error, setState }) => {
    return (
        <Container>
            <Row>
                <Col md={12}>
                    <ManagedFormGroup
                        error={error}
                        inputKey="warehousePlacement"
                    >
                        {(errors) => (
                            <>
                                <Label>Hylleplass</Label>
                                <Input
                                    name="warehousePlacement"
                                    placeholder="Hylleplass"
                                    value={state.warehousePlacement}
                                    onChange={(e) =>
                                        setState({
                                            warehousePlacement: e.target.value,
                                        })
                                    }
                                    invalid={!!errors}
                                />
                            </>
                        )}
                    </ManagedFormGroup>
                    <ManagedFormGroup error={error} inputKey="width">
                        {(errors) => (
                            <>
                                <Label>Bredde (mm)</Label>
                                <Input
                                    type="number"
                                    step="1"
                                    min="1"
                                    name="width"
                                    placeholder="Bredde"
                                    value={state.width}
                                    onChange={(e) =>
                                        setState({
                                            width: parseInt(e.target.value),
                                        })
                                    }
                                    invalid={!!errors}
                                />
                            </>
                        )}
                    </ManagedFormGroup>
                    <ManagedFormGroup error={error} inputKey="height">
                        {(errors) => (
                            <>
                                <Label>Høyde (mm)</Label>
                                <Input
                                    type="number"
                                    step="1"
                                    min="1"
                                    name="height"
                                    placeholder="Høyde"
                                    value={state.height}
                                    onChange={(e) =>
                                        setState({
                                            height: parseInt(e.target.value),
                                        })
                                    }
                                    invalid={!!errors}
                                />
                            </>
                        )}
                    </ManagedFormGroup>
                    <ManagedFormGroup error={error} inputKey="depth">
                        {(errors) => (
                            <>
                                <Label>Dybde (mm)</Label>
                                <Input
                                    type="number"
                                    step="1"
                                    min="1"
                                    name="depth"
                                    placeholder="Dybde"
                                    value={state.depth}
                                    onChange={(e) =>
                                        setState({
                                            depth: parseInt(e.target.value),
                                        })
                                    }
                                    invalid={!!errors}
                                />
                            </>
                        )}
                    </ManagedFormGroup>
                    <ManagedFormGroup error={error} inputKey="weight">
                        {(errors) => (
                            <>
                                <Label>Vekt (g)</Label>
                                <Input
                                    type="number"
                                    step="1"
                                    min="1"
                                    name="weight"
                                    placeholder="Vekt"
                                    value={state.weight}
                                    onChange={(e) =>
                                        setState({
                                            weight: parseInt(e.target.value),
                                        })
                                    }
                                    invalid={!!errors}
                                />
                            </>
                        )}
                    </ManagedFormGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default Package;
