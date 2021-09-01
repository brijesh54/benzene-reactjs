import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthHandler from "../utils/AuthHandler";
import { Redirect } from 'react-router';
import MainComponent from "../component/MainComponent";

export var PrivateRouteNew = ({ page, activepage, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                AuthHandler.loggedIn() ? (<MainComponent page={page} activepage={activepage} {...props} />) : (<Redirect to="/" />)
            }
        />
    );
}
