import React from 'react';
import {createStackNavigator} from 'react-navigation';
import AuthScreen from '../auth'
import BaseScreen from "../index";

export default createStackNavigator(
    {
        Auth: {
            screen: AuthScreen,
        },
        Base: {
            screen: BaseScreen
        },
    }, {
        navigationOptions: {
            header: null
        }
    }
);