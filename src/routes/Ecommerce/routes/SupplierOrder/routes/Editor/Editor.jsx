import React from 'react';
import {
    Alert,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Col,
    Container,
    Nav,
    NavItem,
    NavLink,
    Row,
    Spinner,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import appConfig from '../../../../../../config/app.js';
import cn from 'classnames';
import Meta from './tabs/Meta.jsx';
import Products from './tabs/Products.jsx';

const tabs = {
    META: 'meta',
    PRODUCTS: 'products',
};

const Editor = ({ state, setState, saving, error, save }) => {
    const [selectedTab, setSelectedTab] = React.useState(tabs.META);

    return (
        <div>
            <Container className="mt-3">
                <Row>
                    <Col>
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to="/">{appConfig.appName}</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <Link to="/ecommerce">Ecommerce</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <Link to="/ecommerce/supplier-orders">
                                    Supplier orders
                                </Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>Endre</BreadcrumbItem>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row className="my-3">
                    <Col>
                        <div>
                            <Button onClick={() => save()} color="primary">
                                {saving ? <Spinner /> : 'Lagre'}
                            </Button>
                        </div>
                        {error && (
                            <Alert color="danger" className="mt-2">
                                Noe skjedde
                            </Alert>
                        )}
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={cn({
                                        active: selectedTab === tabs.META,
                                    })}
                                    onClick={() => {
                                        setSelectedTab(tabs.META);
                                    }}
                                >
                                    Meta
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={cn({
                                        active: selectedTab === tabs.PRODUCTS,
                                    })}
                                    onClick={() => {
                                        setSelectedTab(tabs.PRODUCTS);
                                    }}
                                >
                                    Products
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Col>
                </Row>
            </Container>
            {selectedTab === tabs.META && (
                <Meta setState={setState} state={state} error={error} />
            )}
            {selectedTab === tabs.PRODUCTS && (
                <Products setState={setState} state={state} error={error} />
            )}
        </div>
    );
};

export default Editor;
