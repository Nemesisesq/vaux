import axios from "axios/index";
import {hostUri, protocol} from "../config";
import React, {Component} from "react";
import {connect} from 'react-redux'
import {setJWT} from "../ducks/ducks.auth";
import {Button, Content, Form, Input, Item, Label, Text, View} from "native-base";
import NavigationService from '../navigation/navigation.service'
import {setUser} from "../ducks/ducks.auth"

class Login extends Component {
    state = {
        email: "",
        password: "",
    }

    _login = async () => {
        const {setJWT} = this.props
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
                debugger
                setUser(response.data.user)
                setJWT(response.data.jwt)
                console.log(response)
                return response
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
                    <Form style={{paddingTop:100}}>
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
                                secureTextEntry={true}
                            />
                        </Item>
                    </Form>
                    <Button full onPress={this._login}>
                        <Text>Login</Text>
                    </Button>
                    <Button transparent onPress={_ => this.props.navigation.navigate('SignUp')}>
                        <Text>Sign Up</Text>
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
        jwt: state.auth.jwt
    }
}

export default connect(mapStateToProps, {setJWT, setUser})(Login)