//TODO: signin compotent
//TODO: signup component


import React, {Component} from 'react'
import {connect} from "react-redux";
import {Body, Button, Container, Content, Form, Header, Input, Item, Label, Text, Title, View} from "native-base";
import axios from "axios";
import {hostUri, protocol} from "../config";
import {store, auth} from "../ducks/";
import _ from 'lodash'


export class Login extends Component {
    state = {
        email: "",
        password: "",
    }

    _login = async () => {

        await axios({
            url: `${protocol.http}${hostUri}/auth/login`,
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            data: this.state
        })
            .then(response => {

                store.dispatch(auth.setJWT(response.data.jwt))
                console.log(response)
                //    TODO do something with the JWT
            })
            .catch(error => {
                console.log(error);
                alert(error)
            });

    }

    render() {
        const {email, password} = this.state
        return (

                <Content>
                    <Form>
                        <Item stackedLabel>
                            <Label>Email</Label>
                            <Input
                                value={email}
                                onChangeText={this._onChangeText("email")}
                                autoCapitalize = 'none'
                            />
                        </Item>
                        <Item stackedLabel last>
                            <Label>Password</Label>
                            <Input
                                value={password}
                                onChangeText={this._onChangeText("password")}
                                autoCapitalize = 'none'
                                secureTextEntry={true}
                            />
                        </Item>
                    </Form>
                    <Button full onPress={this._login}>
                        <Text>Login</Text>
                    </Button>
                </Content>

        )
    }

    _onChangeText(key) {
        return (text) => this.setState({[key]: text});
    }
}

export class Signup extends Component {
    state = {
        email: "",
        password: "",
        password_confirmation: ""
    }

    _signup = async () => {

        await axios({
            url: `${protocol.http}${hostUri}/auth/signup`,
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            data: this.state
        })
            .then(response => {
                store.dispatch(auth.setScreen("login"))
                console.log(response)
                //    TODO do something with the JWT
            })
            .catch(error => {
                console.log(error);
                alert(error)
            });

    }

    render() {
        const {email, password, password_confirm} = this.state
        return (


                <Content>
                    <Form>
                        <Item stackedLabel>
                            <Label>Email</Label>
                            <Input
                                value={email}
                                onChangeText={this._onChangeText("email")}
                                autoCapitalize = 'none'
                            />
                        </Item>
                        <Item stackedLabel last>
                            <Label>Password</Label>
                            <Input
                                value={password}
                                onChangeText={this._onChangeText("password")}
                                autoCapitalize = 'none'
                            />
                        </Item>
                        <Item stackedLabel last>
                            <Label>Confirm Password</Label>
                            <Input
                                value={password_confirm}
                                onChangeText={this._onChangeText("password_confirm")}
                                autoCapitalize = 'none'
                            />
                        </Item>
                    </Form>
                    <Button full onPress={this._signup}>
                        <Text>Sign Up</Text>
                    </Button>
                </Content>

        )
    }

    _onChangeText(key) {
        return (text) => this.setState({[key]: text});
    }
}

 class Auth extends Component {

    state = {
        screen: "login"
    }

    render() {
        const {screen, jwt, children} = this.props;

        if(_.isEmpty(jwt)) {
            return (
                <Container>
                    <Header>
                        <Body>
                        <Title>{screen && screen.toUpperCase()}</Title>
                        </Body>
                    </Header>

                    {screen === "login" ?
                        <Login up={this._updateJWT}/>
                        :
                        <Signup/>
                    }

                    <Button transparent info onPress={_ => this._ud('login')}>
                        <Text>Login</Text>
                    </Button>
                    <Button transparent info onPress={_ => this._ud('signup')}>
                        <Text>Sign Up</Text>
                    </Button>
                </Container>
            )
        }

        return children
    }

    _ud(state) {
        this.props.setScreen(state)
    }
}


const mapStateToProps = (state)  => {
    return {
        screen : state.auth.screen,
        jwt: state.auth.jwt
    }
}

export default connect(mapStateToProps, {
    setJWT : auth.setJWT,
    setScreen : auth.setScreen,
})(Auth)