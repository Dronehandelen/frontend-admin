import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AuthContext from '../contexts/auth';
import Login from './Login';
import Dashboard from './Dashboard';
import Ecommerce from './Ecommerce';
import Stats from './Stats';
import Page from '../components/Page/Page.jsx';
import Products from './Products';

const Index = () => {
    const { isAdmin, isAuthenticating, isAuthenticated } = React.useContext(
        AuthContext
    );

    if (isAuthenticating) {
        return <></>;
    }

    if (!isAuthenticated) {
        return <Login />;
    }

    if (!isAdmin) {
        return <div>No access</div>;
    }

    return (
        <Page>
            <Switch>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/products" component={Products} />
                <Route path="/ecommerce" component={Ecommerce} />
                <Route path="/stats" component={Stats} />
                <Redirect to="/dashboard" />
            </Switch>
        </Page>
    );
};

export default Index;
