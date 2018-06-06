import React, {Component} from "react";
import Main from "./src/App"

import Amplify, {Auth} from 'aws-amplify';
import {withAuthenticator} from './src/utils/utils.withAuthenticator';
import awsmobile from './src/aws-exports';
import {hostUri} from "./src/config";
import {Button, View} from "react-native";

Amplify.configure(awsmobile);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            error: null
        };
    }

    

    render() {
        return (
                <Main/>

        );
    }
}


export default withAuthenticator(App);