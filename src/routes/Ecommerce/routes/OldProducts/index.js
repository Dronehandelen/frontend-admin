import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProductList from './routes/ProductList';

const Index = ({ match }) => {
    return (
        <Switch>
            <Route exact path={match.path} component={ProductList} />
        </Switch>
    );
};

export default Index;
