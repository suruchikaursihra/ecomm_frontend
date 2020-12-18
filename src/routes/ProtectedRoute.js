import React from 'react';
import { Redirect } from 'react-router-dom';
import ROUTES from '../shared/constants/routes';
import { isAuthenticated } from '../container/auth';

class ProtectedRoute extends React.Component {
    
    /**
     * @description  This method checks to see if the user is authentication or not
     * @param {null} 
     * @return {route} redirect route after authentication
     */
    render() {
        const Component = this.props.component;

        return isAuthenticated() ?
            <Component /> :
            <Redirect {...this.props} to={{ pathname: ROUTES.LOGIN,state: { from: this.props.location} }} />
    }
}

export default ProtectedRoute;