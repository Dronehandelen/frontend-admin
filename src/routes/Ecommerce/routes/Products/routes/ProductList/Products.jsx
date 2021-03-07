import React from 'react';
import cn from 'classnames';
import {
    Alert,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Col,
    Container,
    Input,
    Row,
    Table,
} from 'reactstrap';
import formatPrice from '../../../../../../helpers/formatPrice.js';
import ProductHelper from '../../../../../../helpers/product.js';
import { Link, useHistory } from 'react-router-dom';
import DefaultHookQuery from '../../../../../../containers/DefaultHookQuery.jsx';
import { useDebounce } from 'moment-hooks';
import { gql, useMutation } from '@apollo/client';
import usePaginatedQuery from '../../../../../../hooks/usePaginatedQuery.js';
import Card from '../../../../../../components/Card.jsx';

const FEATURE_PRODUCT = gql`
    mutation FeatureProduct($productId: Int!) {
        featureProduct(productId: $productId)
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

const Products = ({ match }) => {
    const history = useHistory();
    const [featureProduct] = useMutation(FEATURE_PRODUCT);
    const [featuredTitle, setFeaturedTitle] = React.useState(null);
    const [search, setSearch] = React.useState('');
    const debouncedSearch = useDebounce(search, 500);

    return (
        <Container fluid>
            <Row>
                <Col>
                    <Breadcrumb className="pt-3">
                        <BreadcrumbItem>
                            <Link to="/">Dronehandelen</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link to="/ecommerce">Ecommerce</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>Produkter</BreadcrumbItem>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <div>
                            <Button
                                className="mb-2"
                                tag={Link}
                                to={`${match.path}/new`}
                            >
                                Legg til
                            </Button>
                            {featuredTitle && (
                                <Alert color="success">
                                    Successfully featured {featuredTitle}
                                </Alert>
                            )}
                        </div>
                        <div className="mb-2">
                            <Input
                                placeholder="Søk"
                                className="w-100"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <DefaultHookQuery
                            queryHookData={usePaginatedQuery(
                                GET_PRODUCTS,
                                'products',
                                {
                                    filters: {
                                        onlyPublished: false,
                                        search: debouncedSearch,
                                        shouldShowPackages: true,
                                    },
                                },
                                {
                                    count: 20,
                                },
                                debouncedSearch.length === 0
                                    ? 'id'
                                    : 'searchRank'
                            )}
                        >
                            {({ data, fetchMore }) => (
                                <>
                                    <Table hover>
                                        <thead>
                                            <tr>
                                                <th>Tittel</th>
                                                <th>Pris</th>
                                                <th>Pris på tilbud</th>
                                                <th>Elefun pris</th>
                                                <th>Publisert</th>
                                                <th>Antall på lager</th>
                                                <th>Jobber</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.products.edges
                                                .map((edge) => edge.node)
                                                .map((product) => {
                                                    const wrappedProduct = ProductHelper(
                                                        product
                                                    );
                                                    const expectedPrice = wrappedProduct.expectedPriceBasedOnCompetitors();
                                                    const elefunPrice = wrappedProduct.competitorPrice(
                                                        1
                                                    );

                                                    const isUnexpectedPrice =
                                                        expectedPrice &&
                                                        expectedPrice !==
                                                            product.originalPrice;

                                                    const isExpectedPrice =
                                                        expectedPrice &&
                                                        expectedPrice ===
                                                            product.originalPrice;

                                                    return (
                                                        <tr
                                                            key={product.id}
                                                            onClick={() =>
                                                                history.push(
                                                                    `${match.path}/${product.id}`
                                                                )
                                                            }
                                                        >
                                                            <td>
                                                                {product.title}
                                                            </td>
                                                            <td>
                                                                <span
                                                                    className={cn(
                                                                        {
                                                                            'text-danger': isUnexpectedPrice,
                                                                            'text-success': isExpectedPrice,
                                                                        }
                                                                    )}
                                                                >
                                                                    {formatPrice(
                                                                        product.originalPrice
                                                                    )}
                                                                    {isUnexpectedPrice && (
                                                                        <span>
                                                                            (
                                                                            {formatPrice(
                                                                                expectedPrice
                                                                            )}
                                                                            )
                                                                        </span>
                                                                    )}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                {product.originalPrice !==
                                                                    product.price &&
                                                                    formatPrice(
                                                                        product.price
                                                                    )}
                                                            </td>
                                                            <td>
                                                                {elefunPrice &&
                                                                    formatPrice(
                                                                        elefunPrice
                                                                    )}
                                                            </td>
                                                            <td>
                                                                {product.isPublished
                                                                    ? 'Ja'
                                                                    : 'Nei'}
                                                            </td>
                                                            <td>
                                                                {product.stock}
                                                            </td>
                                                            <td>
                                                                <Button
                                                                    className="mr-1"
                                                                    size="sm"
                                                                    tag={Link}
                                                                    to={`${match.path}/${product.id}`}
                                                                >
                                                                    Endre
                                                                </Button>
                                                                <Button
                                                                    size="sm"
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        e.stopPropagation();
                                                                        e.preventDefault();
                                                                        featureProduct(
                                                                            {
                                                                                variables: {
                                                                                    productId:
                                                                                        product.id,
                                                                                },
                                                                            }
                                                                        ).then(
                                                                            () =>
                                                                                setFeaturedTitle(
                                                                                    product.title
                                                                                )
                                                                        );
                                                                    }}
                                                                >
                                                                    Feature
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                        </tbody>
                                    </Table>
                                    {fetchMore && (
                                        <div className="d-flex justify-content-center">
                                            <Button
                                                color="primary"
                                                size="lg"
                                                onClick={() => fetchMore()}
                                            >
                                                Last inn flere
                                            </Button>
                                        </div>
                                    )}
                                </>
                            )}
                        </DefaultHookQuery>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Products;
