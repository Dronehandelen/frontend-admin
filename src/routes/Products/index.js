import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Products from './routes/Products';
import OldProducts from './routes/OldProducts';
import MonitoredProducts from './routes/MonitoredProducts';
import ScanProduct from './routes/ScanProduct';

const Index = ({ match }) => {
    return (
        <Switch>
            <Route path={match.path + '/all'} component={Products} />
            <Route path={match.path + '/old'} component={OldProducts} />
            <Route
                path={match.path + '/monitored'}
                component={MonitoredProducts}
            />
            <Route path={match.path + '/scan'} component={ScanProduct} />
            <Redirect to="/products/all" />
        </Switch>
    );
};

export default Index;
