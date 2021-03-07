import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './routes/Home';
import SupplierDetails from './routes/SupplierDetails';

const Routes = (props) => (
    <Switch>
        <Route exact path={props.match.path} component={Home} />
        <Route
            exact
            path={`${props.match.path}/:supplierId`}
            component={SupplierDetails}
        />
    </Switch>
);

export default Routes;
