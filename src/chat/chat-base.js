import React, {Component} from "react";
import PropTypes from "prop-types";
import {Audio} from "expo";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import {GiftedChat} from "react-native-gifted-chat";
import {connect} from "react-redux";
import EIcon from "react-native-vector-icons/Entypo";

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
            newMessageSound: null,
            soundSelectionHandler: null,
            messageReceivingSound: null,
            soundPaletteShowing: false
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
        const {socketHelper, user} = this.props;
        socketHelper.unsubscribe(
            `thread.${this.props.activeThread}`,
            this._receiveMessage
        );
        socketHelper.unsubscribe(ADD_MESSAGE, this._receiveMessage);
    }

    _receiveMessage = data => {
        data = data.payload.map(i => JSON.parse(i))
        let [message] = data;
        message._id = message.id;
        this.props.updateMessage(message.thread_id, message._id, message);
    };

    _onSend = (messages = []) => {
        const {user} = this.props
        const {socketHelper} = this.props;
        const {newMessageSound: sound} = this.state;
        if (sound) {
            messages = messages.map(msg => {
                msg.sound = sound;
                return msg;
            });
            this._playSoundAsync(sound);
        }
        this.setState({newMessageSound: null});
        messages.user = user
        // this.props.addMessages(this.props.activeThread, messages);
        const data = new Data(ADD_MESSAGE, messages, this.props.activeThread);
        socketHelper.ws.send(data.json());
    };

    _onModalCancel = () => {
        this.setState({
            soundPaletteShowing: false,
            messageReceivingSound: null
        });
    };

    _onAddToExistingMessage = sound => {
        const {messageReceivingSound: message} = this.state;
        const {_id: messageId} = message;

        this._playSoundAsync(sound);
        this.props.updateMessage(this.props.activeThread, messageId, {sound});
        this.setState({
            soundPaletteShowing: false,
            messageReceivingSound: null
        });
    };

    _onAddToNewMessage = sound => {
        this.setState({newMessageSound: sound, soundPaletteShowing: false});
    };

    _renderCustomView(data) {
        return <MessageIcon message={data.currentMessage}/>;
    }

    _onSoundActionClick = () => {
        this.setState({
            soundPaletteShowing: true,
            soundSelectionHandler: this._onAddToNewMessage
        });
    };

    _renderActions = data => {
        let spIconWrapperStyle = {};
        let spIconColor = colors.accent.default;
        const {newMessageSound} = this.state;
        if (newMessageSound) {
            spIconWrapperStyle.backgroundColor = newMessageSound.color;
            spIconColor = colors.white;
        }

        return (
            <View style={styles.SP__IconWrapper}>
                <TouchableOpacity
                    style={[styles.SP__Icon, spIconWrapperStyle]}
                    onPress={this._onSoundActionClick}
                >
                    <EIcon name="sound" color={spIconColor} size={20}/>
                </TouchableOpacity>
            </View>
        );
    };

    _onLongPress = (context, message) => {
        this.setState({
            soundPaletteShowing: true,
            messageReceivingSound: message,
            soundSelectionHandler: this._onAddToExistingMessage
        });
    };

    async _playSoundAsync(messageSound) {
        const sound = new Audio.Sound();
        try {
            await sound.loadAsync(messageSound.module);
            await sound.playAsync();
        } catch (error) {
            console.log("SOUND TAG: Error, unable to play sound");
        }
    }

    async _playSoundsAsync() {
        const {messages, playedSounds} = this.props;
        for (let message of messages) {
            if (message.sound && !playedSounds.has(message._id)) {
                await this._playSoundAsync(message.sound);
                this.props.addPlayedSound(message._id);
            }
        }
    }

    render() {
        let {navigation, user, messages} = this.props;
        //TODO Populate users in mesaages in threads
        const android = (
            <KeyboardAvoidingView
                behavior={"padding"}
                keyboardVerticalOffset={80}
            />
        );

        return (
            <View style={{flex: 1}}>
                <GiftedChat
                    renderActions={this._renderActions}
                    messages={this.mapMessages(messages)}
                    onSend={this._onSend}
                    user={{_id: user.id}}
                    keyboardShouldPersistTaps={"never"}
                    onLongPress={this._onLongPress}
                    listViewProps={{
                        style: {
                            backgroundColor: colors.primary.extraFaded
                        }
                    }}
                    renderCustomView={this._renderCustomView}
                />
                <SoundPalette
                    isVisible={this.state.soundPaletteShowing}
                    onSelection={this.state.soundSelectionHandler}
                    onCancel={this._onModalCancel}
                />
                {Platform.OS === "android" && android}
            </View>
        );
    }

    mapMessages(messages) {
       messages = messages.map(item => {
            return {
                _id: item.id,
                text: item.text,
                createdAt: new Date(Date.parse(item.created_at)),
                user: {
                    _id: item.user_id,
                    name: item.user.name,
                    avatar: 'https://facebook.github.io/react/img/logo_og.png',
                },
                // image: 'https://facebook.github.io/react/img/logo_og.png',
                // Any additional custom parameters are passed through
            }
        })
        return messages;
    }
}

function mapStateToProps(state) {
    return {
        activeThread: state.thread.activeThread,
        messages: state.message.data[state.thread.activeThread],
        socketHelper: state.networking.socketHelper,
        playedSounds: state.message.playedSounds,
        user: state.auth.user
    };
}

export default connect(mapStateToProps, {
    updateMessage: message.updateMessage,
    addMessages: message.addMessages,
    addPlayedSound: message.addPlayedSound,
    setMessagesForThread: message.setMessagesForThread
})(ChatBase);

const styles = StyleSheet.create({
    SP__IconWrapper: {
        width: 50,
        alignSelf: "stretch",
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center"
    },
    SP__Icon: {
        height: 30,
        width: 30,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center"
    }
});
