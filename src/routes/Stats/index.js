import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Searches from './routes/Searches';

const Index = ({ match }) => {
    return (
        <Switch>
            <Route path={match.path + '/searches'} component={Searches} />
            <Redirect to="/stats/searches" />
        </Switch>
    );
};

export default Index;
