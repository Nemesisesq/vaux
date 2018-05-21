import React, { Component } from "react";
import { YellowBox, StatusBar, View, Text } from "react-native";
import { AppLoading, Asset } from "expo";
import { dispatch, Provider } from "react-redux";

import { store, message } from "./src/ducks";
import localStore from "./src/utils/local-store";
import { ASSET_DIR, SOUNDS } from "./src/constants";
import Base from "./src";

/*
 * ignore react-native core warnings; these are irrelevant, as per here:
 * https://github.com/facebook/react-native/issues/18175
 */
YellowBox.ignoreWarnings([
   "Warning: componentWillMount is deprecated",
   "Warning: componentWillUpdate is deprecated",
   "Warning: componentWillReceiveProps is deprecated"
]);

export default class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isReady: false,
         errored: false
      };
   }

   // TODO: pre-cache sound assets, fonts, logos, etc.
   async _performAsyncSetup() {
      // initialize local store and update redux with played sounds
      const initRes = await localStore.initialize();
      const setRes = await localStore.retrieveSet(
         localStore.STORE_KEYS.PLAYED_SOUNDS
      );
      if (!initRes.success || !setRes.success) {
         this.setState({ errored: true });
         return;
      }
      store.dispatch(message.setPlayedSounds(setRes.data));

      // pre-cache sounds
      const soundAssets = Object.values(SOUNDS).map(sound => {
         return Asset.fromModule(sound.module).downloadAsync();
      });
      await Promise.all(soundAssets);
   }

   render() {
      // TODO: style loading screen
      if (!this.state.isReady) {
         return (
            <AppLoading
               startAsync={this._performAsyncSetup}
               onFinish={() => this.setState({ isReady: true })}
               onError={() => this.setState({ isReady: true, errored: true })}
            />
         );
      }

      // TODO: create a real error screen
      if (this.state.errored) {
         return (
            <View
               style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1
               }}
            >
               <Text>An error occured</Text>
            </View>
         );
      }

      return (
         <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="transparent" barStyle="light-content" />
            <Provider store={store}>
               <Base />
            </Provider>
         </View>
      );
   }
}
