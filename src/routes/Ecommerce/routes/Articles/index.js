import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './routes/Home';
import Editor from './routes/Editor';

const Index = (props) => (
    <Switch>
        <Route exact path={props.match.path} component={Home} />
        <Route exact path={`${props.match.path}/new`} component={Editor} />
        <Route
            exact
            path={`${props.match.path}/:articleId`}
            component={Editor}
        />
    </Switch>
);

export default Index;
