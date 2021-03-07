import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProductList from './routes/ProductList';
import EditProduct from './routes/EditProduct';
import ProductDetails from './routes/ProductDetails';

const Index = ({ match }) => {
    return (
        <Switch>
            <Route exact path={match.path} component={ProductList} />
            <Route exact path={`${match.path}/new`} component={EditProduct} />
            <Route
                exact
                path={`${match.path}/:productId`}
                component={ProductDetails}
            />
            <Route
                exact
                path={`${match.path}/:productId/edit`}
                component={EditProduct}
            />
        </Switch>
    );
};

export default Index;
