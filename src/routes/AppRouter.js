import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';

import DashBoard from '../containers/DashBoard/';
import Header from '../components/Header';
import NotFoundPage from '../components/NotFoundPage';

const AppRouter = () => (
    <BrowserRouter>
        <div id="main">
            <Header />
            <Switch>
                <Route path="/(registration|login)?" exact={true} component={DashBoard} />
                <Route path="/cards/id=:id" component={DashBoard} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
);
export default AppRouter;