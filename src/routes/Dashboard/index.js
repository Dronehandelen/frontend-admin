import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './routes/Home';

const Index = ({ match }) => {
    return (
        <Switch>
            <Route path={match.path} component={Home} />
        </Switch>
    );
};

export default Index;
