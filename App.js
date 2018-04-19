import React, { Component } from "react";
import { StatusBar, View } from "react-native";

import Base from "./src";

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
