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
import {setUser} from "../ducks/networking-duck";


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


         await axios({
            url: `${protocol.http}${hostUri}/verify`,
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.props.jwt}`
            }
        })
            .then(response => {
                this.props.setUser(response.data)
                NavigationService.navigate('Base');
                console.log(response);
            })
            .catch(error => {
                this.props.navigation.navigate('Login')
                console.log(error);
            });

    }

    componentDidUpdate(){
        if (_.isEmpty(this.props.jwt)) {
            this.props.navigation.navigate('Login')
            return
        }
    }

    render() {
        const {navigation} = this.props
        if (navigation.getParam('logout')){
            this.props.setJWT(null)
        }
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Loading placeholder</Text>
                </View>
            )
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
    setScreen,
    setUser
})(Auth)



export default createStackNavigator(
    {

        Auth: {
            screen: ConnectedAuth
        },
        Login: {
            screen: LoginScreen
        },

        SignUp: {
            screen: SignupScreen
        }
    }
);

