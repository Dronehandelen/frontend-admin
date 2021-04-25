import React from 'react';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    FormGroup,
    Input,
    Label,
} from 'reactstrap';
import Brand from '../components/Brand';
import appConfig from '../../../../../../../config/app';
import { generateProductAlias } from '../../../../../../../helpers/product.js';
import ManagedFormGroup from '../../../../../../../components/ManagedFormGroup.jsx';
import ProductPicker from '../../../../../../../components/ProductPicker.jsx';

const General = ({ state, error, setState, canonicalRedirectProduct }) => {
    return (
        <>
            <ManagedFormGroup error={error} inputKey="type">
                {(errors) => (
                    <>
                        <Label>Type</Label>
                        <Input
                            type="select"
                            name="type"
                            value={state.type}
                            onChange={(e) =>
                                setState({
                                    type: e.target.value,
                                })
                            }
                            invalid={!!errors}
                        >
                            {Object.values(appConfig.productTypes).map(
                                (value) => (
                                    <option value={value} key={value}>
                                        {value}
                                    </option>
                                )
                            )}
                        </Input>
                    </>
                )}
            </ManagedFormGroup>
            <ManagedFormGroup error={error} inputKey="title">
                {(errors) => (
                    <>
                        <Label>Tittel</Label>
                        <Input
                            type="text"
                            name="title"
                            placeholder="Tittel"
                            value={state.title}
                            onChange={(e) =>
                                setState({
                                    title: e.target.value,
                                })
                            }
                            invalid={!!errors}
                        />
                    </>
                )}
            </ManagedFormGroup>
            <ManagedFormGroup error={error} inputKey="alias">
                {(errors) => (
                    <>
                        <Label>Alias</Label>
                        <Input
                            type="text"
                            name="alias"
                            placeholder="Alias"
                            value={state.alias}
                            onChange={(e) =>
                                setState({
                                    alias: e.target.value,
                                })
                            }
                            invalid={!!errors}
                        />
                        <Button
                            color="primary"
                            onClick={() => {
                                setState({
                                    alias: generateProductAlias({
                                        title: state.title,
                                    }),
                                });
                            }}
                        >
                            Set from title
                        </Button>
                    </>
                )}
            </ManagedFormGroup>
            <ManagedFormGroup error={error} inputKey="price">
                {(errors) => (
                    <>
                        <Label>Pris</Label>
                        <Input
                            type="number"
                            name="price"
                            placeholder="Pris"
                            value={state.price}
                            onChange={(e) =>
                                setState({
                                    price: e.target.value,
                                })
                            }
                            invalid={!!errors}
                        />
                    </>
                )}
            </ManagedFormGroup>
            <ManagedFormGroup error={error} inputKey="shortDescription">
                {(errors) => (
                    <>
                        <Label>Kort beskrivelse</Label>
                        <Input
                            type="textarea"
                            name="shortDescription"
                            placeholder="Kort beskrivelse"
                            value={state.shortDescription}
                            onChange={(e) =>
                                setState({
                                    shortDescription: e.target.value,
                                })
                            }
                            invalid={!!errors}
                        />
                    </>
                )}
            </ManagedFormGroup>
            <ManagedFormGroup error={error} inputKey="thirdPartyDescription">
                {(errors) => (
                    <>
                        <Label>Beskrivelse for tredjepart</Label>
                        <Input
                            type="textarea"
                            name="thirdPartyDescription"
                            value={state.thirdPartyDescription}
                            onChange={(e) =>
                                setState({
                                    thirdPartyDescription: e.target.value,
                                })
                            }
                            invalid={!!errors}
                        />
                    </>
                )}
            </ManagedFormGroup>
            <ManagedFormGroup error={error} inputKey="gtin">
                {(errors) => (
                    <>
                        <Label>GTIN</Label>
                        <Input
                            type="text"
                            name="gtin"
                            placeholder="GTIN"
                            value={state.gtin}
                            onChange={(e) =>
                                setState({
                                    gtin: e.target.value,
                                })
                            }
                            invalid={!!errors}
                        />
                    </>
                )}
            </ManagedFormGroup>
            {state.type !== appConfig.productTypes.PACKAGE && (
                <>
                    <ManagedFormGroup error={error} inputKey="stock">
                        {(errors) => (
                            <>
                                <Label>Lager</Label>
                                <Input
                                    type="number"
                                    name="stock"
                                    value={state.stock}
                                    onChange={(e) =>
                                        setState({
                                            stock: parseInt(e.target.value),
                                        })
                                    }
                                    invalid={!!errors}
                                />
                            </>
                        )}
                    </ManagedFormGroup>
                    <ManagedFormGroup
                        error={error}
                        inputKey="countAvailableForBackorder"
                    >
                        {(errors) => (
                            <>
                                <Label>Antall tilgjengelig for restordre</Label>
                                <Input
                                    type="number"
                                    name="countAvailableForBackorder"
                                    value={state.countAvailableForBackorder}
                                    onChange={(e) =>
                                        setState({
                                            countAvailableForBackorder: parseInt(
                                                e.target.value
                                            ),
                                        })
                                    }
                                    invalid={!!errors}
                                />
                            </>
                        )}
                    </ManagedFormGroup>
                    {state.countAvailableForBackorder !== 0 && (
                        <ManagedFormGroup
                            error={error}
                            inputKey="backorderMessage"
                        >
                            {(errors) => (
                                <>
                                    <Label>Melding for restordre</Label>
                                    <Input
                                        type="text"
                                        name="backorderMessage"
                                        value={state.backorderMessage}
                                        onChange={(e) =>
                                            setState({
                                                backorderMessage:
                                                    e.target.value,
                                            })
                                        }
                                        invalid={!!errors}
                                    />
                                </>
                            )}
                        </ManagedFormGroup>
                    )}
                </>
            )}
            <Brand
                brandId={state.brandId}
                setBrandId={(brandId) => setState({ brandId })}
            />
            <Card className="mt-2">
                <CardHeader>Other</CardHeader>
                <CardBody>
                    <FormGroup check>
                        <Label check>
                            <Input
                                type="checkbox"
                                checked={state.isPublished}
                                onChange={() =>
                                    setState({
                                        isPublished: !state.isPublished,
                                    })
                                }
                            />{' '}
                            Is published?
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input
                                type="checkbox"
                                checked={state.isExpired}
                                onChange={() =>
                                    setState({
                                        isExpired: !state.isExpired,
                                    })
                                }
                            />{' '}
                            Is expired?
                        </Label>
                    </FormGroup>
                </CardBody>
            </Card>
            {state.isExpired && (
                <Card className="mt-2">
                    <CardHeader>Canonical redirect product</CardHeader>
                    <CardBody>
                        <ProductPicker
                            maxCount={1}
                            selectedProducts={canonicalRedirectProduct.value}
                            setSelectedProducts={
                                canonicalRedirectProduct.setValue
                            }
                        />
                    </CardBody>
                </Card>
            )}
        </>
    );
};

export default General;
