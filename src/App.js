import React, {Component} from "react";
import {YellowBox, StatusBar, View, Text} from "react-native";
import {AppLoading, Asset} from "expo";
import {dispatch, Provider} from "react-redux";

import {store, message, networking} from "./ducks/index";
import localStore from "./utils/local-store";
import {ASSET_DIR, SOUNDS, BASE_URL} from "./constants/index";
import Base from "./index";
import ErrorScreen from "./components/error-screen";
import {Auth} from "aws-amplify/lib/index";
import axios from 'axios';
import {hostUri} from "./config";
import {setUser} from "./ducks/networking-duck";

/*
 * ignore react-native core warnings; these are irrelevant, as per here:
 * https://github.com/facebook/react-native/issues/18175
 */
YellowBox.ignoreWarnings([
    "Warning: componentWillMount is deprecated",
    "Warning: componentWillUpdate is deprecated",
    "Warning: componentWillReceiveProps is deprecated"
]);


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

        userPayload = {name: "", email: "", profile: ""};


        await axios({
            url: `http://${hostUri}/verify`,
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: data.jwtToken
            },
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            });

        return user;
    };


    // TODO: pre-cache sound assets, fonts, logos, etc.
    _performAsyncSetup = async () => {
        // initialize local store and update redux with played sounds
        const initRes = await localStore.initialize();
        const setRes = await localStore.retrieveSet(
            localStore.STORE_KEYS.PLAYED_SOUNDS
        );

        if (!initRes.success || !setRes.success) {
            this.setState({error: "An error occurred 😭"});
            return;
        }

        store.dispatch(message.setPlayedSounds(setRes.data));

        const user = await this._getUser();
        store.dispatch(setUser(user));

        await store.dispatch(networking.connect(`ws://${hostUri}/connect`));


        const {error} = store.getState().networking;
        if (error) {
            this.setState({error});
            return;
        }

        // pre-cache sounds
        const soundAssets = Object.values(SOUNDS).map(sound => {
            return Asset.fromModule(sound.module).downloadAsync();
        });
        await Promise.all(soundAssets);
    };

    _onError = err => {
        console.log(err);
        this.setState({isReady: true});
    };

    render() {
        // TODO: style loading screen
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._performAsyncSetup}
                    onFinish={() => this.setState({isReady: true})}
                    onError={this._onError}
                />
            );
        }

        if (this.state.error) {
            return <ErrorScreen text={this.state.error}/>;
        }

        return (
            <View style={{flex: 1}}>
                <StatusBar backgroundColor="transparent" barStyle="light-content"/>
                <Provider store={store}>
                    <Base/>
                </Provider>
            </View>
        );
    }
}


export default App;