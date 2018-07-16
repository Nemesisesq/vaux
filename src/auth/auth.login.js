import axios from "axios/index";
import React, {Component} from "react";
import {connect} from 'react-redux'
import {setJWT} from "../ducks/ducks.auth";
import {Button, Content, Form, Input, Item, Label, Text} from "native-base";

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

                setJWT(response.data.jwt)
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
            </Content>

        )
    }

    _onChangeText(key) {
        return (text) => this.setState({[key]: text});
    }
}


const mapStateToProps = state => {
    return {
        jwt : state.auth.jwt
    }
}

export default connect(mapStateToProps, {setJWT})(Login)