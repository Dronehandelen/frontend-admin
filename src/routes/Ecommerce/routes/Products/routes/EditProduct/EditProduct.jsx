import React from 'react';
import cn from 'classnames';
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
import Images from './tabs/Images.jsx';
import { Link } from 'react-router-dom';
import General from './tabs/General';
import Description from './tabs/Description';
import Category from './tabs/Category';
import Tag from './tabs/Tag';
import Competitor from './tabs/Competitor';
import Package from './tabs/Package.jsx';
import appConfig from '../../../../../../config/app.js';
import Accessories from './tabs/Accessories.jsx';
import PackageProducts from './tabs/PackageProducts';
import Card from '../../../../../../components/Card.jsx';

const tabs = {
    GENERAL: 'general',
    PICTURE: 'pictures',
    DESCRIPTION: 'description',
    CATEGORY: 'category',
    TAGS: 'tags',
    COMPETITOR: 'competitor',
    PACKAGE: 'package',
    ACCESSORIES: 'accessories',
    PACKAGE_PRODUCTS: 'packageProducts',
};

const EditProduct = ({
    product,
    state,
    setState,
    accessoryProducts,
    packageProducts,
    canonicalRedirectProduct,
    error,
    save,
    saving,
}) => {
    const [selectedTab, setSelectedTab] = React.useState(tabs.GENERAL);

    return (
        <>
            <Container fluid>
                <Row>
                    <Col>
                        <Breadcrumb className="pt-3">
                            <BreadcrumbItem>
                                <Link to="/">{appConfig.appName}</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <Link to="/ecommerce">Ecommerce</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <Link to="/ecommerce/products">Produkter</Link>
                            </BreadcrumbItem>
                            {product && (
                                <BreadcrumbItem>
                                    <Link
                                        to={'/ecommerce/products/' + product.id}
                                    >
                                        {product.title}
                                    </Link>
                                </BreadcrumbItem>
                            )}
                            <BreadcrumbItem active>Endre</BreadcrumbItem>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <div>
                                <Button onClick={() => save()} color="primary">
                                    {saving ? <Spinner /> : 'Lagre'}
                                </Button>
                                {product && (
                                    <Button
                                        tag={Link}
                                        to={`/products/${product.id}`}
                                        className="ml-1"
                                        color="success"
                                    >
                                        Til produktsiden
                                    </Button>
                                )}
                            </div>
                            {error && (
                                <Alert color="danger" className="mt-2">
                                    Noe skjedde
                                </Alert>
                            )}
                            <Nav tabs className="my-4">
                                <NavItem>
                                    <NavLink
                                        className={cn({
                                            active:
                                                selectedTab === tabs.GENERAL,
                                        })}
                                        onClick={() => {
                                            setSelectedTab(tabs.GENERAL);
                                        }}
                                    >
                                        Info
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={cn({
                                            active:
                                                selectedTab ===
                                                tabs.DESCRIPTION,
                                        })}
                                        onClick={() => {
                                            setSelectedTab(tabs.DESCRIPTION);
                                        }}
                                    >
                                        Beskrivelse
                                    </NavLink>
                                </NavItem>
                                {state.type !==
                                    appConfig.productTypes.PACKAGE && (
                                    <NavItem>
                                        <NavLink
                                            className={cn({
                                                active:
                                                    selectedTab ===
                                                    tabs.PACKAGE,
                                            })}
                                            onClick={() => {
                                                setSelectedTab(tabs.PACKAGE);
                                            }}
                                        >
                                            Pakke
                                        </NavLink>
                                    </NavItem>
                                )}
                                <NavItem>
                                    <NavLink
                                        className={cn({
                                            active:
                                                selectedTab === tabs.PICTURE,
                                        })}
                                        onClick={() => {
                                            setSelectedTab(tabs.PICTURE);
                                        }}
                                    >
                                        Bilder
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={cn({
                                            active:
                                                selectedTab === tabs.CATEGORY,
                                        })}
                                        onClick={() => {
                                            setSelectedTab(tabs.CATEGORY);
                                        }}
                                    >
                                        Category
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={cn({
                                            active: selectedTab === tabs.TAGS,
                                        })}
                                        onClick={() => {
                                            setSelectedTab(tabs.TAGS);
                                        }}
                                    >
                                        Tags
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={cn({
                                            active:
                                                selectedTab ===
                                                tabs.ACCESSORIES,
                                        })}
                                        onClick={() => {
                                            setSelectedTab(tabs.ACCESSORIES);
                                        }}
                                    >
                                        Tilbehør
                                    </NavLink>
                                </NavItem>
                                {state.type ===
                                    appConfig.productTypes.PACKAGE && (
                                    <NavItem>
                                        <NavLink
                                            className={cn({
                                                active:
                                                    selectedTab ===
                                                    tabs.PACKAGE_PRODUCTS,
                                            })}
                                            onClick={() => {
                                                setSelectedTab(
                                                    tabs.PACKAGE_PRODUCTS
                                                );
                                            }}
                                        >
                                            Pakkeprodukter
                                        </NavLink>
                                    </NavItem>
                                )}
                                <NavItem>
                                    <NavLink
                                        className={cn({
                                            active:
                                                selectedTab === tabs.COMPETITOR,
                                        })}
                                        onClick={() => {
                                            setSelectedTab(tabs.COMPETITOR);
                                        }}
                                    >
                                        Competitors
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            {selectedTab === tabs.GENERAL && (
                                <General
                                    setState={setState}
                                    state={state}
                                    error={error}
                                    canonicalRedirectProduct={
                                        canonicalRedirectProduct
                                    }
                                />
                            )}
                            {selectedTab === tabs.DESCRIPTION && (
                                <Description
                                    setState={setState}
                                    state={state}
                                    error={error}
                                />
                            )}
                            {selectedTab === tabs.PACKAGE && (
                                <Package
                                    setState={setState}
                                    state={state}
                                    error={error}
                                />
                            )}
                            {selectedTab === tabs.PICTURE && (
                                <Images
                                    setState={setState}
                                    state={state}
                                    error={error}
                                />
                            )}
                            {selectedTab === tabs.CATEGORY && (
                                <Category
                                    setState={setState}
                                    state={state}
                                    error={error}
                                />
                            )}
                            {selectedTab === tabs.TAGS && (
                                <Tag
                                    setState={setState}
                                    state={state}
                                    error={error}
                                />
                            )}
                            {selectedTab === tabs.COMPETITOR && (
                                <Competitor
                                    product={product}
                                    setState={setState}
                                    state={state}
                                    error={error}
                                />
                            )}
                            {selectedTab === tabs.ACCESSORIES && (
                                <Accessories
                                    accessoryProducts={accessoryProducts}
                                />
                            )}
                            {selectedTab === tabs.PACKAGE_PRODUCTS && (
                                <PackageProducts
                                    packageProducts={packageProducts}
                                />
                            )}
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default EditProduct;
