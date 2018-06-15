import React, {Component} from "react";
import Main from "./src/App"
import Amplify from 'aws-amplify';
import {withAuthenticator} from './src/utils/utils.withAuthenticator';
import awsmobile from './src/aws-exports';


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