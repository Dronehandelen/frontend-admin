import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Orders from './routes/Orders';
import OrderCheck from './routes/OrderCheck';
import Articles from './routes/Articles';
import Stats from './routes/Stats';
import SupplierOrder from './routes/SupplierOrder';
import StockManager from './routes/StockManager';
import Categories from './routes/Categories';
import Brands from './routes/Brands';

const Index = ({ match }) => {
    return (
        <Switch>
            <Route path={match.path + '/orders'} component={Orders} />
            <Route path={match.path + '/check-orders'} component={OrderCheck} />
            <Route path={match.path + '/articles'} component={Articles} />
            <Route path={match.path + '/stats'} component={Stats} />
            <Route
                path={`${match.path}/supplier-orders`}
                component={SupplierOrder}
            />
            <Route
                path={`${match.path}/stock-manager`}
                component={StockManager}
            />
            <Route path={`${match.path}/categories`} component={Categories} />
            <Route path={`${match.path}/brands`} component={Brands} />
        </Switch>
    );
};

export default Index;
