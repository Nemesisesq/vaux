import React, { Component } from "react";
import Main from "./src/App";
import { store, persistor } from "./src/ducks";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

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
         <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                  <Main />
            </PersistGate>
         </Provider>
      );
   }
}

export default App;
