import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Brands from './routes/Brands';
import BrandDetails from './routes/BrandDetails';

const Index = ({ match }) => {
    return (
        <Switch>
            <Route exact path={match.path} component={Brands} />
            <Route
                exact
                path={`${match.path}/:brandId`}
                component={BrandDetails}
            />
        </Switch>
    );
};

export default Index;
