import React from 'react';
import cn from 'classnames';
import {
    Button,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
} from 'reactstrap';
import DefaultHookQuery from '../containers/DefaultHookQuery.jsx';
import usePaginatedQuery from '../hooks/usePaginatedQuery.js';
import { useDebounce } from 'moment-hooks';
import { ProductImage } from './ProductCard';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

const GET_PRODUCT_BY_ID = gql`
    query GetProducts($ids: [Int!]!) {
        productsByIds(ids: $ids) {
            id
            description
            shortDescription
            originalPrice
            price
            title
            isPublished
            stock
            images {
                fileId
                url
            }
            primaryImage {
                fileId
                url
            }
        }
    }
`;

const GET_PRODUCTS = gql`
    query GetProducts(
        $filters: ProductFilters
        $pagination: PaginationInput!
        $orderBy: String!
    ) {
        products(
            filters: $filters
            pagination: $pagination
            orderBy: $orderBy
        ) {
            pageInfo {
                endCursor
                hasNextPage
            }
            edges {
                node {
                    alias
                    id
                    description
                    shortDescription
                    originalPrice
                    price
                    title
                    isPublished
                    stock
                    createdAt
                    images {
                        fileId
                        url
                    }
                    primaryImage {
                        fileId
                        url
                    }
                    brand {
                        id
                        name
                    }
                    stars {
                        rating
                        count
                    }
                    competitorPrices {
                        competitorId
                        price
                    }
                }
            }
        }
    }
`;

const StyledProduct = styled.div`
    border: 2px solid transparent;
    padding: 15px;
    width: 100%;
    cursor: pointer;
    display: flex;

    & > * {
        flex: 1;
    }
    & > *:not(:first-child) {
        flex: 2;
    }

    &.selected {
        border: 2px solid orange;
    }

    &:hover:not(.selected) {
        border: 2px solid #666666;
    }
`;

const Product = ({ product, onClick, selected }) => {
    return (
        <StyledProduct
            onClick={onClick}
            className={cn({
                selected,
            })}
        >
            <ProductImage product={product} imageHeight={100} />
            <div className="pl-2">
                <div>
                    <strong>{product.title}</strong>
                </div>
                <div>{product.shortDescription}</div>
            </div>
        </StyledProduct>
    );
};

const SelectedProducts = ({
    selectedProducts,
    setSelectedProducts,
    productMetadataRenderer,
    children,
    openPicker,
    colProps = {},
}) => {
    return (
        <Row className="mt-2">
            <DefaultHookQuery
                queryHookData={useQuery(GET_PRODUCT_BY_ID, {
                    variables: { ids: selectedProducts.map((a) => a.id) },
                })}
                handleNotFound
            >
                {({ data }) => {
                    if (children) {
                        return children({
                            products: data.productsByIds,
                            openPicker,
                        });
                    }

                    if (data.productsByIds.length === 0) {
                        return (
                            <Col>
                                <strong>ingen</strong>
                            </Col>
                        );
                    }
                    return data.productsByIds.map((product) => (
                        <Col key={product.id} md={3} {...colProps}>
                            <Product
                                product={product}
                                onClick={() => {
                                    setSelectedProducts(
                                        [...selectedProducts].filter(
                                            (itemValue) =>
                                                itemValue.id !== product.id
                                        )
                                    );
                                }}
                            />
                            {productMetadataRenderer &&
                                productMetadataRenderer({
                                    productInfo: selectedProducts.find(
                                        (x) => x.id === product.id
                                    ),
                                })}
                        </Col>
                    ));
                }}
            </DefaultHookQuery>
        </Row>
    );
};

const ProductPicker = ({
    selectedProducts,
    setSelectedProducts,
    productMetadataRenderer,
    defaultMetadataValues,
    maxCount = null,
    children,
    colProps,
    minimal = false,
}) => {
    const [search, setSearch] = React.useState(() => '');
    const [isOpen, setIsOpen] = React.useState(false);

    const productsQueryData = usePaginatedQuery(GET_PRODUCTS, 'products', {
        filters: { search: useDebounce(search, 500) },
    });

    return (
        <Container fluid>
            {!children && (
                <>
                    {!minimal && (
                        <Row className="mt-3">
                            <Col>
                                <h2>Valgte produkter</h2>
                            </Col>
                        </Row>
                    )}
                    <SelectedProducts
                        selectedProducts={selectedProducts}
                        productMetadataRenderer={productMetadataRenderer}
                        defaultMetadataValues={defaultMetadataValues}
                        setSelectedProducts={setSelectedProducts}
                        colProps={colProps}
                    />
                    <Row className="mt-2">
                        <Col>
                            <Button onClick={() => setIsOpen(true)}>
                                Legg til
                            </Button>
                        </Col>
                    </Row>
                </>
            )}
            {children && (
                <SelectedProducts
                    selectedProducts={selectedProducts}
                    productMetadataRenderer={productMetadataRenderer}
                    defaultMetadataValues={defaultMetadataValues}
                    setSelectedProducts={setSelectedProducts}
                    children={children}
                    openPicker={() => setIsOpen(true)}
                />
            )}
            <Modal isOpen={isOpen} toggle={() => setIsOpen(false)}>
                <ModalHeader toggle={() => setIsOpen(false)}>
                    Velg produkter
                </ModalHeader>
                <ModalBody>
                    <Row className="mb-2">
                        <Col>
                            <Form
                                inline
                                onSubmit={(e) => {
                                    e.preventDefault();
                                }}
                            >
                                <FormGroup className="flex-grow-1">
                                    <Input
                                        className="w-100"
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <DefaultHookQuery
                                queryHookData={productsQueryData}
                                handleNotFound
                            >
                                {({ data }) => {
                                    const products = data.products.edges.map(
                                        (edge) => edge.node
                                    );

                                    return products.map((product) => (
                                        <React.Fragment key={product.id}>
                                            <Product
                                                product={product}
                                                onClick={() => {
                                                    let newValue = [
                                                        ...selectedProducts,
                                                    ];

                                                    if (
                                                        selectedProducts.some(
                                                            (p) =>
                                                                p.id ===
                                                                product.id
                                                        )
                                                    ) {
                                                        newValue =
                                                            newValue.filter(
                                                                (itemValue) =>
                                                                    itemValue.id !==
                                                                    product.id
                                                            );
                                                    } else {
                                                        if (
                                                            newValue.length ===
                                                            maxCount
                                                        ) {
                                                            newValue.shift();
                                                        }

                                                        newValue.push({
                                                            ...defaultMetadataValues,
                                                            id: product.id,
                                                        });
                                                    }

                                                    setSelectedProducts(
                                                        newValue
                                                    );
                                                }}
                                                selected={selectedProducts.some(
                                                    (p) => p.id === product.id
                                                )}
                                            />
                                        </React.Fragment>
                                    ));
                                }}
                            </DefaultHookQuery>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => {
                            setIsOpen(false);
                        }}
                    >
                        Ferdig
                    </Button>
                </ModalFooter>
            </Modal>
        </Container>
    );
};

export default ProductPicker;
