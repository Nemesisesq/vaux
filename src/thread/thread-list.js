import React, {Component} from "react";
import PropTypes from "prop-types";
import {View, FlatList, StyleSheet, Button} from "react-native";
import {connect} from "react-redux";

import {colors, AppPropTypes} from "../constants";
import {thread, message} from "../ducks";
import ThreadItem from "./thread-item";
import ListEmpty from "../components/list-empty";
import FAB from 'react-native-fab';
import {Icon} from 'native-base';
import {Data, Thread} from '../utils';
import Chance from 'chance';

// NOTE: sample data, to be removed later
import {
    SAMPLE_THREAD_IDS,
    generateSampleThreads,
    generateSampleMessages
} from "../utils/sample-data";
import {CREATE_THREAD, SET_USER} from "../utils/types";

class ThreadList extends Component {
    static propTypes = {
        threads: PropTypes.arrayOf(AppPropTypes.Thread).isRequired
    };

    static defaultProps = {
        threads: []
    };

    static navigationOptions = {
        title: "Messages",


    };
    _addThread = () => {
        const {socketHelper} = this.props;
        const chance = new Chance();
        console.log("pressed");
        let t  = new Thread("", chance.word());
        const data = new Data(CREATE_THREAD, t.toJson(), null);
        socketHelper.ws.send(data.json())
    }

    componentDidMount() {
        const {socketHelper} = this.props;
        socketHelper.subscribe("threads", this._receivedThreads);
        const data = new Data(SET_USER, this.props.email, null);
        socketHelper.ws.send(data.json())


        // NOTE: uncomment to populate with sample data
        // const sampleThreads = generateSampleThreads(SAMPLE_THREAD_IDS.length, {
        //    threadIds: SAMPLE_THREAD_IDS
        // });
        // this.props.setThreads(sampleThreads);
        // for (let threadId of SAMPLE_THREAD_IDS) {
        //    const sampleMessages = generateSampleMessages(5);
        //    this.props.setMessagesForThread(threadId, sampleMessages);
        // }
    }

    componentWillUnmount() {
        const {socketHelper} = this.props;
        socketHelper.unsubscribe("threads", this._receivedThreads);

    }

    constructor(props) {
        super(props);
        this.state = {
            playedSounds: null
        };
    }

    _receivedThreads = data => {

        data.payload && this.props.setThreads(data.payload);
        console.log(data);
    };

    _rowSelected = threadId => {
        this.props.setActiveThread(threadId);
        this.props.navigation.navigate("Chat");
    };

    _renderItem = ({item}) => {
        let thread = {...item};
        let messageSnippet = "";
        const messages = this.props.messages[thread.id] || []
        debugger

        if (messages.length > 0) {

        for (let message of messages) {
            if (message.text) {
                messageSnippet = message.text.slice(0, 35);
                if (messageSnippet.length > message.text.length) {
                    messageSnippet += "...";
                }
                break;
            }
        }
        }
        return (
            <ThreadItem
                thread={thread}
                onPress={this._rowSelected}
                messageSnippet={messageSnippet}
            />
        );
    };

    _keyExtractor = item => item.id;

    render() {
        if (this.props.threads.length) {
            return (
                <View style={styles.TL}>
                    <FlatList
                        style={styles.TL__List}
                        data={this.props.threads}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                    />
                    <FAB buttonColor="red" iconTextColor="#FFFFFF" onClickAction={this._addThread} visible={true}
                         iconTextComponent={<Icon name="add"/>}/>
                </View>
            );
        }

        return (
            <View style={styles.TL}>
                <ListEmpty text="No message threads 😭"/>
                <FAB buttonColor="red" iconTextColor="#FFFFFF" onClickAction={this._addThread} visible={true}
                     iconTextComponent={<Icon name="add"/>}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        threads: state.thread.data,
        messages: state.message.data,
        socketHelper: state.networking.socketHelper,
        email: state.networking.user.signInUserSession.idToken.payload.email
    };
}

export default connect(mapStateToProps, {
    setThreads: thread.setThreads,
    setActiveThread: thread.setActiveThread,
    setMessagesForThread: message.setMessagesForThread
})(ThreadList);

const styles = StyleSheet.create({
    TL: {
        flex: 1,
        alignSelf: "stretch",
        backgroundColor: colors.white
    },
    TL__List: {
        flex: 1,
        backgroundColor: colors.primary.extraFaded
    }
});
