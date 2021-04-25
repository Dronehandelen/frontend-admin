import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Products from './routes/Products';
import OldProducts from './routes/OldProducts';
import MonitoredProducts from './routes/MonitoredProducts';

const Index = ({ match }) => {
    return (
        <Switch>
            <Route path={match.path + '/all'} component={Products} />
            <Route path={match.path + '/old'} component={OldProducts} />
            <Route
                path={match.path + '/monitored'}
                component={MonitoredProducts}
            />
            <Redirect to="/products/all" />
        </Switch>
    );
};

export default Index;
