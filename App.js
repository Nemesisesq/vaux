import React, {Component} from "react";
import Main from "./src/App"

import Amplify, {Auth} from 'aws-amplify';
import {withAuthenticator} from './src/utils/utils.withAuthenticator';
import awsmobile from './src/aws-exports';
import {hostUri} from "./src/config";

Amplify.configure(awsmobile);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            error: null
        };
    }

    _getUser = async () => {
        let user = await Auth.currentAuthenticatedUser();

        let data = {
            ...user.signInUserSession.idToken.payload,
            jwtToken: user.signInUserSession.idToken.jwtToken
        };


        user = {name: "", email: "", profile: ""};


        await axios({
            url: `http://${hostUri}/user`,
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            data: data
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            });

        return user;
    };


    render() {

        return (
                <Main/>

        );
    }
}


export default App;