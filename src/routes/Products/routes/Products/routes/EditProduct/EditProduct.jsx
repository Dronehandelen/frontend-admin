import React from 'react';
import cn from 'classnames';
import { Alert, Nav, NavItem, NavLink, Spinner } from 'reactstrap';
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
import {
    Box,
    Breadcrumbs,
    Button,
    Container,
    Grid,
    Typography,
    Tabs,
    Tab,
} from '@material-ui/core';

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
    const [selectedTab, setSelectedTab] = React.useState(0);

    const tabs = [
        {
            name: 'Info',
            component: () => (
                <General
                    setState={setState}
                    state={state}
                    error={error}
                    canonicalRedirectProduct={canonicalRedirectProduct}
                />
            ),
        },
        {
            name: 'Beskrivelse',
            component: () => (
                <Description setState={setState} state={state} error={error} />
            ),
        },
        state.type !== appConfig.productTypes.PACKAGE && {
            name: 'Pakke',
            component: () => (
                <Package setState={setState} state={state} error={error} />
            ),
        },
        {
            name: 'Bilder',
            component: () => (
                <Images setState={setState} state={state} error={error} />
            ),
        },
        {
            name: 'Category',
            component: () => (
                <Category setState={setState} state={state} error={error} />
            ),
        },
        {
            name: 'Tags',
            component: () => (
                <Tag setState={setState} state={state} error={error} />
            ),
        },
        {
            name: 'Tilbehør',
            component: () => (
                <Accessories accessoryProducts={accessoryProducts} />
            ),
        },
        state.type === appConfig.productTypes.PACKAGE && {
            name: 'Pakkeprodukter',
            component: () => (
                <PackageProducts packageProducts={packageProducts} />
            ),
        },
        {
            name: 'Competitors',
            component: () => (
                <Competitor
                    product={product}
                    setState={setState}
                    state={state}
                    error={error}
                />
            ),
        },
    ].filter(Boolean);
    return (
        <Container maxWidth="md">
            <Grid component={Box} container paddingY={2}>
                <Grid item>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/">{appConfig.appName}</Link>
                        <Link to="/products">Produkter</Link>
                        {product && (
                            <Link to={'/products/alle' + product.id}>
                                {product.title}
                            </Link>
                        )}
                        <Typography color="textPrimary">Endre</Typography>
                    </Breadcrumbs>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item>
                    <Card>
                        <div>
                            <Button
                                onClick={() => save()}
                                color="primary"
                                variant="contained"
                            >
                                {saving ? <Spinner /> : 'Lagre'}
                            </Button>
                            {product && (
                                <Button
                                    component="a"
                                    href={`https://www.dronehandelen.no/products/${product.id}`}
                                    target="_blank"
                                    className="ml-1"
                                    color="secondary"
                                    variant="contained"
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
                        <Box marginY={2}>
                            <Tabs
                                value={selectedTab}
                                indicatorColor="primary"
                                textColor="primary"
                                onChange={(event, tab) => {
                                    setSelectedTab(tab);
                                }}
                            >
                                {tabs.map((tab) => (
                                    <Tab
                                        key={tab.name}
                                        label={tab.name}
                                        style={{ minWidth: 50 }}
                                    />
                                ))}
                            </Tabs>
                        </Box>
                        {tabs[selectedTab].component()}
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default EditProduct;
