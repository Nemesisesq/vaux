import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Container, Content, List, ListItem, Text} from 'native-base'
import {setUserList} from "../ducks/networking-duck";
import {Data, Thread} from "../utils";
import Chance from "chance";
import {CREATE_THREAD} from "../utils/types";
import axios from 'axios'
import {hostUri, protocol} from "../config";


class NewThread extends Component {


    _addThread = async (item) => {
        await axios({
            url: `${protocol.http}${hostUri}/threads/new`,
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.props.jwt}`
            }
        })
            .then(response => {
                debugger

                const {socketHelper, user} = this.props;

                let newThread = response.data
                newThread.name = `Chat with ${user.email}`
                newThread.owner = _.pick(user, ['id'])

                newThread.members = [user, item].map(item => {
                    return _.pick(item, ["id"])
                })
                newThread = _.pick(newThread, ['name', 'owner', 'members'])
                const data = new Data(CREATE_THREAD, newThread, null);
                socketHelper.ws.send(data.json());
                this.props.navigation.popToTop()
            })
            .catch(e => {
                console.log(e)
            })
    };

    render() {

        const {userList} = this.props
        return (
            <Container>
                <Content>
                    <List>
                        <ListItem> Choose User to chat with</ListItem>
                        {userList.map(item => {
                            return (
                                <ListItem onPress={_ => this._addThread(item)}>
                                    <Text>{item.email}</Text>
                                </ListItem>
                            )
                        })}
                    </List>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        userList: state.networking.userList,
        socketHelper: state.networking.socketHelper,
        jwt: state.auth.jwt,
        user: state.auth.user
    }
}

export default connect(mapStateToProps, {setUserList})(NewThread)