import React, { Component } from "react";
import { YellowBox, StatusBar, View, Text } from "react-native";
import { AppLoading, Asset } from "expo";
import { connect, dispatch } from "react-redux";
import { message, networking } from "./ducks/index";
import localStore from "./utils/local-store";
import { ASSET_DIR, SOUNDS} from "./constants/index";
import ErrorScreen from "./components/error-screen";
import axios from "axios";
import { hostUri, protocol } from "./config";
import RootStack from './navigation'
import NavigationService from "./navigation/navigation.service";

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
         cacheError: null
      };
   }

   _getUser = async () => {
      await axios({
         url: `${protocol.http}${hostUri}/verify`,
         method: "GET",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.props.jwt}`
         }
      })
         .then(response => {
            this.props.setUser(response.data);
            console.log(response);
         })
         .catch(error => {
            console.log(error);
         });
   };

   // TODO: pre-cache sound assets, fonts, logos, etc.
   _performAsyncSetup = async () => {
      // initialize local store and update redux with played sounds
      const initRes = await localStore.initialize();
      const setRes = await localStore.retrieveSet(
         localStore.STORE_KEYS.PLAYED_SOUNDS
      );

      if (!initRes.success || !setRes.success) {
         this.setState({ cacheError: "An error occurred 😭" });
         return;
      }

      this.props.setPlayedSounds(setRes.data);

      const url = `${protocol.ws}${hostUri}/api/connect`;
      await this.props.connect(url);

      // pre-cache sounds
      const soundAssets = Object.values(SOUNDS).map(sound => {
         return Asset.fromModule(sound.module).downloadAsync();
      });
      await Promise.all(soundAssets);
   };

   _onError = err => {
      console.log(err);
      this.setState({ isReady: true });
   };

   render() {
      // TODO: style loading screen
      if (!this.state.isReady) {
         return (
            <AppLoading
               startAsync={this._performAsyncSetup}
               onFinish={() => this.setState({ isReady: true })}
               onError={this._onError}
            />
         );
      }

      if (this.state.error) {
         return (
            <ErrorScreen
               text={this.state.cacheError || this.props.networkError}
            />
         );
      }

      return (
         <View style={{ flex: 1 }}>
            <RootStack
                ref={navigatorRef => {
                    NavigationService.setRootNavigator(navigatorRef);
                }}
            />
         </View>
      );
   }
}

const mapStateToProps = ({ auth = {}, networking = {} }) => {
   return {
      jwt: auth.jwt,
      networkError: networking.error
   };
};

const mapDispatchToProps = {
   setPlayedSounds: message.setPlayedSounds,
   connect: networking.connect,
   setUser: networking.setUser
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
