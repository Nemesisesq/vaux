import React, {Component} from "react";
import PropTypes from "prop-types";
import {Audio} from "expo";
import {StyleSheet, View, Text} from "react-native";
import {GiftedChat} from "react-native-gifted-chat";
import {connect} from "react-redux";

import {AppPropTypes, colors} from "../constants";
import {message} from "../ducks";
import BackButton from "../components/back-button";
import MessageIcon from "./message-icon";
import SoundPalette from "./sound-palette";
import {Data} from "../utils";
import {ADD_MESSAGE} from "../utils/types";

class ChatBase extends Component {
    static navigationOptions = ({navigation, navigationOptions}) => {
        const {params: {title} = {}} = navigation.state;
        return {
            title,
            headerLeft: <BackButton onPress={() => navigation.goBack()}/>
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            sound: null
        };
    }

    async componentDidMount() {
        const {socketHelper} = this.props;
        socketHelper.subscribe(ADD_MESSAGE, this._receiveMessage);
        this.props.navigation.setParams({
            // TODO: should be `x.user._id != viewing_user_id`
            title: this.props.messages.find(x => x.user._id != 1).user.name
        });
        this._playSoundsAsync();
    }

    componentWillUnmount() {
        const {socketHelper} = this.props;
        socketHelper.unsubscribe(`thread.${this.props.activeThread}`, this._receiveMessage);
        socketHelper.unsubscribe(ADD_MESSAGE, this._receiveMessage);
    }

    _receiveMessage = data => {
        debugger
        this.props.addMessages(data.thread_id, data.payload)
        console.log(data)
    }

    _onSend = (messages = []) => {

        const {socketHelper} = this.props;
        messages = messages.map(msg => {
            msg.sound = this.state.sound;
            return msg;
        });
        this.setState({sound: null});
        this.props.addMessages(this.props.activeThread, messages);

        const data = new Data(ADD_MESSAGE, messages, this.props.activeThread);
        socketHelper.ws.send(data.json())
    };

    _onSelection = sound => {
        this.setState({sound});
    };

    _renderCustomView(data) {
        return <MessageIcon message={data.currentMessage}/>;
    }

    _renderActions = data => {
        return (
            <SoundPalette
                activeSound={this.state.sound}
                onSelection={this._onSelection}
            />
        );
    };

    async _playSoundsAsync() {
        const {messages, playedSounds} = this.props;
        for (let message of messages) {
            if (message.sound && !playedSounds.has(message._id)) {
                const sound = new Audio.Sound();
                try {
                    await sound.loadAsync(message.sound.module);
                    await sound.playAsync();
                } catch (error) {
                    console.log("SOUND TAG: Error, unable to play sound");
                }
                this.props.addPlayedSound(message._id);
            }
        }
    }

    render() {
        return (
            <GiftedChat
                renderActions={this._renderActions}
                messages={this.props.messages}
                onSend={this._onSend}
                user={{_id: 1}}
                keyboardShouldPersistTaps={'never'}
                listViewProps={{
                    style: {
                        backgroundColor: colors.primary.extraFaded
                    }
                }}
                renderCustomView={this._renderCustomView}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        activeThread: state.thread.activeThread,
        messages: state.message.data[state.thread.activeThread],
        socketHelper: state.networking.socketHelper,
        playedSounds: state.message.playedSounds
    };
}

export default connect(mapStateToProps, {
    addMessages: message.addMessages,
    addPlayedSound: message.addPlayedSound,
    setMessagesForThread: message.setMessagesForThread
})(ChatBase);

const styles = StyleSheet.create({});
