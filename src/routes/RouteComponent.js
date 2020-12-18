import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ROUTES from "../shared/constants/routes";
import DashboardComponent from '../components/Dashboard/DashboardComponent';
import CartComponent from '../components/Cart/CartComponent';
import LoginComponent from '../components/Login/LoginComponent';
import SpinnerComponent from '../shared/spinner/spinner';
import ProtectedRoute from './ProtectedRoute';

class RouteComponent extends Component {

    /**
     * @description  This is the basic route defining component
     */
    render() {
        return (
            <Router>
                <SpinnerComponent name={'Oval'} />
                <Switch>
                    <ProtectedRoute exact path={ROUTES.DASHBOARD} component={DashboardComponent} />
                    <ProtectedRoute exact path={ROUTES.MYCART} component={CartComponent} />
                    <Route exact path={ROUTES.LOGIN} render={props => <LoginComponent {...props} />} />
                </Switch>
            </Router>
        );
    }
}


export default RouteComponent;
