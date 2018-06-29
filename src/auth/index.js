//TODO: signin compotent
//TODO: signup component


import React, {Component} from 'react'
import {Body, Button, Container, Content, Form, Header, Input, Item, Label, Text, Title, View} from "native-base";
import axios from "axios";
import {hostUri, protocol} from "../config";


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
                console.log(response)
                //    TODO do something with the JWT
            })
            .catch(error => {
                console.log(error);
            });

    }

    render() {
        const {email, password} = this.state
        return (

                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input
                                value={email}
                                onChangeText={this._onChangeText("email")}
                            />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input
                                value={password}
                                onChangeText={this._onChangeText("password")}
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
        password_confirm: ""
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
                console.log(response)
                //    TODO do something with the JWT
            })
            .catch(error => {
                console.log(error);
            });

    }

    render() {
        const {email, password, password_confirm} = this.state
        return (


                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input
                                value={email}
                                onChangeText={this._onChangeText("email")}
                            />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input
                                value={password}
                                onChangeText={this._onChangeText("password")}
                            />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Confirm Password</Label>
                            <Input
                                value={password_confirm}
                                onChangeText={this._onChangeText("password_confirm")}
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

export default class Auth extends Component {

    state = {
        screen: "login"
    }

    render() {
        const {screen} = this.state;


        return (
            <Container>
                <Header>
                    <Body>
                    <Title>{screen.toUpperCase()}</Title>
                    </Body>
                </Header>

                {screen === "login" ?
                    <Login/>
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

    _ud(state) {
        this.setState({
            screen: state
        })
    }
}


