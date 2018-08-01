import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";

import { navStyles } from "./constants";
import ThreadList from "./thread";
import ChatBase from "./chat";
import NewThread from "./thread/thread.new"

const Navigator = createStackNavigator(
   {
      Threads: {
         screen: ThreadList
      },
      Chat: {
         screen: ChatBase
      },
       NewThread: {
          screen: NewThread
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
