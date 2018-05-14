import React, { Component } from "react";
import { StackNavigator } from "react-navigation";

import { navStyles } from "./constants";
import ThreadList from "./thread";
import ChatBase from "./chat";

const Navigator = StackNavigator(
   {
      Threads: {
         screen: ThreadList
      },
      Chat: {
         screen: ChatBase
      }
   },
   {
      initialRoute: "Threads",
      navigationOptions: {
         ...navStyles.primary
      }
   }
);

export default class Base extends Component {
   render() {
      return <Navigator />;
   }
}
