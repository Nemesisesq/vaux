import React, {Compoennt} from 'react';
import {connect} from 'react-redux'
import {hostUri, protocol} from "../config";
import axios from "axios/index";
import {auth, store} from "../ducks";
import {Component} from "react";
import {Button, Content, Form, Input, Item, Label, Text} from "native-base";

class Signup extends Component {
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
                this.props.navigation.navigate('Login')
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
                            autoCapitalize='none'
                        />
                    </Item>
                    <Item stackedLabel last>
                        <Label>Password</Label>
                        <Input
                            value={password}
                            onChangeText={this._onChangeText("password")}
                            autoCapitalize='none'
                        />
                    </Item>
                    <Item stackedLabel last>
                        <Label>Confirm Password</Label>
                        <Input
                            value={password_confirm}
                            onChangeText={this._onChangeText("password_confirm")}
                            autoCapitalize='none'
                        />
                    </Item>
                </Form>
                <Button full onPress={this._signup}>
                    <Text>Sign Up</Text>
                </Button>
                <Button transparent onPress={_ => this.props.navigation.navigate('Login')}>
                    <Text>Login</Text>
                </Button>
            </Content>

        )
    }

    _onChangeText(key) {
        return (text) => this.setState({[key]: text});
    }
}

const mapStateToProps = state => {
    return {

    }
}

export default connect(mapStateToProps, {})(Signup)