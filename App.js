import React, {Component} from "react";
import Main from "./src/App"
import Auth from "./src/auth";
import {store} from "./src/ducks";
import {Provider} from "react-redux";



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
                <Auth>
                    <Main/>
                </Auth>
            </Provider>
        );
    }
}


export default App;