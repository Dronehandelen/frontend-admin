import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Orders from './routes/Orders';
import OrderDetails from './routes/OrderDetails';

const Index = ({ match }) => {
    return (
        <Switch>
            <Route exact path={match.path} component={Orders} />
            <Route
                exact
                path={`${match.path}/:orderId`}
                component={OrderDetails}
            />
        </Switch>
    );
};

export default Index;
