import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { connect } from "react-redux";

import { AppPropTypes, colors } from "../constants";
import { message } from "../ducks";
import BackButton from "../components/back-button";

class ChatBase extends Component {
   static propTypes = {
      messages: PropTypes.arrayOf(AppPropTypes.Message).isRequired
   };

   static defaultProps = {
      messages: []
   };

   static navigationOptions = ({ navigation, navigationOptions }) => {
      const { params: { title } = {} } = navigation.state;
      return {
         title,
         headerLeft: <BackButton onPress={() => navigation.goBack()} />
      };
   };

   state = {
      messages: this.props.messages
   };

   componentDidMount() {
      this.props.navigation.setParams({
         // TODO: should be `x.user._id != viewing_user_id`
         title: this.props.messages.find(x => x.user._id != 1).user.name
      });
   }

   _onSend = (messages = []) => {
      this.setState(previousState => ({
         messages: GiftedChat.append(previousState.messages, messages)
      }));
   };

   render() {
      return (
         <GiftedChat
            messages={this.state.messages}
            onSend={this._onSend}
            user={{ id: 1 }}
            listViewProps={{
               style: {
                  backgroundColor: colors.primary.extraFaded
               }
            }}
         />
      );
   }
}

function mapStateToProps(state) {
   return {
      messages: state.message.data[state.thread.activeThread]
   };
}

export default connect(mapStateToProps, {
   addMessage: message.addMessage
})(ChatBase);

const styles = StyleSheet.create({});
