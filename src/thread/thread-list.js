import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, FlatList, StyleSheet } from "react-native";
import { connect } from "react-redux";

import { colors, AppPropTypes } from "../constants";
import { SocketHelper } from "../networking";
import { thread, message } from "../ducks";
import ThreadItem from "./thread-item";
import ListEmpty from "../components/list-empty";

// NOTE: sample data, to be removed later
import {
   SAMPLE_THREAD_IDS,
   generateSampleThreads,
   generateSampleMessages
} from "../utils/sample-data";

class ThreadList extends Component {
   static propTypes = {
      threads: PropTypes.arrayOf(AppPropTypes.Thread).isRequired
   };

   static defaultProps = {
      threads: []
   };

   static navigationOptions = {
      title: "Messages"
   };

   componentDidMount() {
      const { socketHelper } = this.props;
      socketHelper.subscribe("threads", this._receivedThreads);

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
      const { socketHelper } = this.props;
      socketHelper.unsubscribe("threads", this._receivedThreads);
   }

   constructor(props) {
      super(props);
      this.state = {
         playedSounds: null
      };
   }

   _receivedThreads = data => {
      console.log(data);
   };

   _rowSelected = threadId => {
      this.props.setActiveThread(threadId);
      this.props.navigation.navigate("Chat");
   };

   _renderItem = ({ item }) => {
      let thread = { ...item };
      let messageSnippet = "";
      const messages = this.props.messages[thread.id];
      for (let message of messages) {
         if (message.text) {
            messageSnippet = message.text.slice(0, 35);
            if (messageSnippet.length > message.text.length) {
               messageSnippet += "...";
            }
            break;
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
            </View>
         );
      }

      return (
         <View style={styles.TL}>
            <ListEmpty text="No message threads 😭" />
         </View>
      );
   }
}

function mapStateToProps(state) {
   return {
      threads: state.thread.data,
      messages: state.message.data,
      socketHelper: state.networking.socketHelper
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
