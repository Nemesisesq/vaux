import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";

import { navStyles } from "./constants";
import ThreadList from "./thread";
import ChatBase from "./chat";

const Navigator = createStackNavigator(
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

export default class  Base extends Component {
   render() {
      return <Navigator />;
   }
}
