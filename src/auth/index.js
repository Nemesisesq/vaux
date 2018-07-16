import React,{Component} from 'react'
import {connect} from 'react-redux'
import {createStackNavigator} from 'react-navigation'
import LoginScreen from './auth.login'
import SignupScreen from './auth.signup'
import {Text, View} from "native-base";
import {setJWT, setScreen} from "../ducks/ducks.auth";
import NavigationService from "../navigation/navigation.service";
import axios from 'axios'
import { hostUri, protocol } from "../config";


class Auth extends Component {

    state = {
        screen: "login",
        jwtValid: false,
    }

    componentDidMount() {
            debugger
        if (_.isEmpty(this.props.jwt)) {
            this.props.navigation.navigate('Login')
            return
        }

        axios({
            url: `${protocol.http}${hostUri}/verify`,
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.props.jwt}`
            }
        })
            .then(response => {
                debugger
                NavigationService.navigate('Base');
                console.log(response);
            })
            .catch(error => {
                debugger
                this.props.navigation.navigate('Login')
                console.log(error);
            });

    }

    render() {

            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Loading placeholder</Text>
                </View>
            )


    }

    _ud(state) {
        this.props.setScreen(state)
    }
}


const mapStateToProps = (state) => {
    return {
        screen: state.auth.screen,
        jwt: state.auth.jwt
    }
}

const ConnectedAuth = connect(mapStateToProps, {
    setJWT,
    setScreen
})(Auth)



export default createStackNavigator(
    {

        Auth: {
            screen: ConnectedAuth
        },
        Login: {
            screen: LoginScreen
        },

        Signup: {
            screen: SignupScreen
        }
    }
);

