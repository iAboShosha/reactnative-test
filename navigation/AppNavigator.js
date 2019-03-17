import React from 'react';
import {createSwitchNavigator} from 'react-navigation';
import {connect} from "react-redux";
import {createReactNavigationReduxMiddleware, reduxifyNavigator} from "react-navigation-redux-helpers";
import {tabNavigator} from "./MainTabNavigator";
import * as Screens from '../screens';

const middleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav,
);

const RootSwitchNavigator = createSwitchNavigator({
        Main: {screen: tabNavigator},
        LoginScreen: {screen: Screens.LoginScreen},
    },
    {
        initialRouteName: "LoginScreen"
    });

const AppWithNavigationState = reduxifyNavigator(RootSwitchNavigator, 'root');

const mapStateToProps = state => ({
    state: state.nav,
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export {RootSwitchNavigator, AppNavigator, middleware};