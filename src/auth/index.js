import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createStackNavigator} from 'react-navigation'
import LoginScreen from './auth.login'
import SignupScreen from './auth.signup'
import {Text, View} from "native-base";
import {setJWT, setScreen} from "../ducks/ducks.auth";
import NavigationService from "../navigation/navigation.service";
import axios from 'axios'
import {hostUri, protocol} from "../config";
import {setUser} from "../ducks/ducks.auth";


class Auth extends Component {

    state = {
        screen: "login",
        jwtValid: false,
    }

    async componentDidMount() {
        if (_.isEmpty(this.props.jwt)) {
            this.props.navigation.navigate('Login')
            return
        }


        await this._verifyUser();

    }

    async _verifyUser() {
        await axios({
            url: `${protocol.http}${hostUri}/verify`,
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.props.jwt}`
            }
        })
            .then(async response => {
                await this.props.setUser(response.data)
                NavigationService.navigate('Base');
                console.log(response);
            })
            .catch(error => {
                this.props.navigation.navigate('Login')
                console.log(error);
            });
    }

    componentDidUpdate() {
        if (_.isEmpty(this.props.jwt)) {
            this.props.navigation.navigate('Login')
            return
        }
    }


    shouldComponentUpdate(nextProps, nextState) {

        if (this.props.jwt !== nextProps.jwt) {
            if (_.isEmpty(nextProps.jwt)) {

                this.props.navigation.navigate('Login')
                return true
            } else {

                NavigationService.navigate('Base')
                return true
            }
        }

        const {navigation} = nextProps
        if (navigation.getParam('logout')) {
            this.props.setJWT(null)
            navigation.setParams(null)
        }
        return true
    }

    render() {

        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Loading placeholder</Text>
                {JSON.stringify(this.props.jwt)}
                {JSON.stringify(this.props.user)}
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        screen: state.auth.screen,
        jwt: state.auth.jwt,
        user: state.networking.user
    }
}

const ConnectedAuth = connect(mapStateToProps, {
    setJWT,
    setScreen,
    setUser
})(Auth)


export default createStackNavigator(
    {

        Auth: {
            screen: ConnectedAuth,
        },
        Login: {
            screen: LoginScreen,
            navigationOptions: {
                gesturesEnabled: false,
                headerLeft: null
            },
        },

        SignUp: {
            screen: SignupScreen
        }
    },
    {
        headerMode: 'none'
    }
);

