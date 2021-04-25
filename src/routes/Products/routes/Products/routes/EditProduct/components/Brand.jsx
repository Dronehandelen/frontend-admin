import React from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Form,
    FormGroup,
    Input,
    Label,
} from 'reactstrap';
import DefaultHookQuery from '../../../../../../../containers/DefaultHookQuery.jsx';

const GET_BRANDS = gql`
    query GetBrands($filters: BrandFilters) {
        brands(filters: $filters) {
            id
            name
            alias
        }
    }
`;

const CREATE_BRAND = gql`
    mutation Brand($name: String!) {
        brand(name: $name) {
            id
            name
        }
    }
`;

const Brand = ({ brands, brandId, setBrandId, newBrand }) => {
    const [brandName, setBrandName] = React.useState('');

    React.useEffect(() => {
        if (brands.length === 0) {
            return;
        }

        if (!brandId || !brands.some((brand) => brand.id === brandId)) {
            setBrandId(brands[0].id);
        }
    }, [brandId, setBrandId, brands]);
    return (
        <Card>
            <CardHeader>
                <strong>Brand</strong>
            </CardHeader>
            <CardBody>
                {brands.map((brand) => (
                    <FormGroup check key={brand.id}>
                        <Label check>
                            <Input
                                type="radio"
                                name="radio1"
                                onChange={() => {}}
                                onClick={() => setBrandId(brand.id)}
                                checked={brandId === brand.id}
                            />{' '}
                            {brand.name}
                        </Label>
                    </FormGroup>
                ))}
                <Card body color="secondary" className="mt-3">
                    <Form
                        onSubmit={function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            if (brandName.length > 2) {
                                newBrand(brandName);
                            }
                        }}
                    >
                        <FormGroup>
                            <Input
                                type="text"
                                name="name"
                                placeholder="New brand name"
                                value={brandName}
                                onChange={(e) => setBrandName(e.target.value)}
                            />
                        </FormGroup>
                        <Button color="primary">Submit</Button>
                    </Form>
                </Card>
            </CardBody>
        </Card>
    );
};

const BrandContainer = (props) => {
    const [createBrand] = useMutation(CREATE_BRAND);

    return (
        <DefaultHookQuery queryHookData={useQuery(GET_BRANDS)}>
            {({ data, refetch }) => (
                <Brand
                    {...props}
                    brands={data.brands}
                    newBrand={(name) => {
                        createBrand({
                            variables: {
                                name,
                            },
                        }).then(() => {
                            refetch();
                        });
                    }}
                />
            )}
        </DefaultHookQuery>
    );
};

export default BrandContainer;
