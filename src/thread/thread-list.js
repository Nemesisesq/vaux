import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, FlatList, StyleSheet, Button } from "react-native";
import { connect } from "react-redux";
import { colors, AppPropTypes } from "../constants";
import { thread, message } from "../ducks";
import ThreadItem from "./thread-item";
import ListEmpty from "../components/list-empty";
import FAB from "react-native-fab";
import { Icon } from "native-base";
import { Data, Thread } from "../utils";
import Chance from "chance";
import { CREATE_THREAD, SET_USER, SET_ACTIVE_THREAD } from "../utils/types";
import {setJWT} from "../ducks/ducks.auth";
import NavigationService from '../navigation/navigation.service'

class ThreadList extends Component {
   static propTypes = {
      threads: PropTypes.arrayOf(AppPropTypes.Thread).isRequired
   };

   static defaultProps = {
      threads: []
   };



   static navigationOptions = {
      title: "Messages",
      headerRight: (
         <Button
            onPress={() => {
                NavigationService.navigate("Auth", {logout: true})
            }}
            title="Logout"
            color="#fff"
         />
      )
   };

   constructor(props) {
      super(props);
      this.state = {
         playedSounds: null
      };
   }

   _addThread = () => {
      const { socketHelper } = this.props;
      const chance = new Chance();
      console.log("pressed");
      let t = new Thread("", chance.word());
      const data = new Data(CREATE_THREAD, t.toJson(), null);
      socketHelper.ws.send(data.json());
   };

   componentDidMount() {
      const { socketHelper } = this.props;
      socketHelper.subscribe("threads", this._receivedThreads);
      socketHelper.subscribe("bad_user", this._badUser);
      const data = new Data(SET_USER, this.props.email, null);
      socketHelper.ws.send(data.json());

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

   _receivedThreads = data => {
      data.payload && this.props.setThreads(data.payload);

      for (let thread of data.payload) {
         thread.messages = thread.messages.map(item => {
            item._id = item.id;
            item.user._id = item.user.id;
            return item;
         });

         this.props.setMessagesForThread(thread.id, thread.messages);
      }

      console.log(data);
   };

   _rowSelected = threadId => {
      const { socketHelper } = this.props;

      const data = new Data(SET_ACTIVE_THREAD, threadId.id, null);
      socketHelper.ws.send(data.json());
      this.props.setActiveThread(threadId);

      this.props.navigation.navigate("Chat");
   };

   _renderItem = ({ item }) => {
      let thread = { ...item };
      let messageSnippet = "";
      const messages = this.props.messages[thread.id] || [];

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

   _badUser = () => {
       this.props.setJWT(null)
   };

   _keyExtractor = item => item.id;
   shouldComponentUpdate(nextProps, nextState){
       debugger
       return true
   }
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
               <FAB
                  buttonColor="red"
                  iconTextColor="#FFFFFF"
                  onClickAction={this._addThread}
                  visible={true}
                  iconTextComponent={<Icon name="add" />}
               />
            </View>
         );
      }

      return (
         <View style={styles.TL}>
            <ListEmpty text="No message threads 😭" />
            <FAB
               buttonColor="red"
               iconTextColor="#FFFFFF"
               onClickAction={this._addThread}
               visible={true}
               iconTextComponent={<Icon name="add" />}
            />
         </View>
      );
   }
}

function mapStateToProps(state) {
   return {
      threads: state.thread.data,
      messages: state.message.data,
      socketHelper: state.networking.socketHelper,
      email: state.auth.user.email
   };
}

export default connect(mapStateToProps, {
   setThreads: thread.setThreads,
   setActiveThread: thread.setActiveThread,
   setMessagesForThread: message.setMessagesForThread,
    setJWT: setJWT
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
