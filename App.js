import React, {Component} from "react";
import Main from "./src/App";
import {store, persistor} from "./src/ducks";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/lib/integration/react";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            error: null,
            fontLoaded: false
        };
    }

    async componentWillMount() {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });
        this.setState({fontLoaded: true});
    }

    render() {
        return (

            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    {this.state.fontLoaded ? (
                        <Main/>

                    ) : null}
                </PersistGate>
            </Provider>
        );
    }
}

export default App;
