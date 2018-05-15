import React, { Component } from "react";
import PropTypes from "prop-types";
import { Audio } from "expo";
import { StyleSheet, View, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { connect } from "react-redux";

import { AppPropTypes, colors } from "../constants";
import { message } from "../ducks";
import BackButton from "../components/back-button";
import MessageIcon from "./message-icon";

class ChatBase extends Component {
   static navigationOptions = ({ navigation, navigationOptions }) => {
      const { params: { title } = {} } = navigation.state;
      return {
         title,
         headerLeft: <BackButton onPress={() => navigation.goBack()} />
      };
   };

   async componentDidMount() {
      this.props.navigation.setParams({
         // TODO: should be `x.user._id != viewing_user_id`
         title: this.props.messages.find(x => x.user._id != 1).user.name
      });
      this._playSoundsAsync();
   }

   _onSend = (messages = []) => {
      this.props.addMessages(this.props.activeThread, messages);
   };

   _renderCustomView(data) {
      return <MessageIcon message={data.currentMessage} />;
   }

   async _playSoundsAsync() {
      const { messages, playedSounds } = this.props;
      for (let message of messages) {
         if (message.sound && !playedSounds.has(message._id)) {
            const sound = new Audio.Sound();
            try {
               await sound.loadAsync(message.sound);
               await sound.playAsync();
               console.log(`SOUND TAG: Sound playing for ${message._id}`);
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
            messages={this.props.messages}
            onSend={this._onSend}
            user={{ _id: 1 }}
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
   console.log("MAP STATE TO PROPS:", state.message);
   return {
      activeThread: state.thread.activeThread,
      messages: state.message.data[state.thread.activeThread],
      playedSounds: state.message.playedSounds
   };
}

export default connect(mapStateToProps, {
   addMessages: message.addMessages,
   addPlayedSound: message.addPlayedSound,
   setMessagesForThread: message.setMessagesForThread
})(ChatBase);

const styles = StyleSheet.create({});
