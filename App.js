import React, { Component } from "react";
import { YellowBox, StatusBar, View } from "react-native";

import Base from "./src";

// ignore react-native core warnings; these are irrelevant, as per here:
// https://github.com/facebook/react-native/issues/18175
YellowBox.ignoreWarnings([
   "Warning: componentWillMount is deprecated",
   "Warning: componentWillUpdate is deprecated",
   "Warning: componentWillReceiveProps is deprecated"
]);

export default class App extends Component {
   render() {
      return (
         <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="transparent" barStyle="light-content" />
            <Base />
         </View>
      );
   }
}
