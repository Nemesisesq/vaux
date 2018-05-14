import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, FlatList, StyleSheet } from "react-native";
import { connect } from "react-redux";

import ThreadItem from "./thread-item";
import { colors, AppPropTypes } from "../constants";
import { thread, message } from "../ducks";

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
      // TODO: replace with API call
      const sampleThreads = generateSampleThreads(SAMPLE_THREAD_IDS.length, {
         threadIds: SAMPLE_THREAD_IDS
      });
      this.props.setThreads(sampleThreads);
      for (let threadId of SAMPLE_THREAD_IDS) {
         const sampleMessages = generateSampleMessages(10);
         this.props.setMessagesForThread(threadId, sampleMessages);
      }
   }

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
}

function mapStateToProps(state) {
   return {
      threads: state.thread.data,
      messages: state.message.data
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
