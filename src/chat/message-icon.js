import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

import { AppPropTypes, colors } from "../constants";

export default class MessageIcon extends Component {
   static propTypes = {
      message: AppPropTypes.Message
   };

   render() {
      const { message } = this.props;

      if (!message.sound) {
         return <View />;
      }

      let iconColor = colors.white;
      let wrapperColor = colors.accent.default;
      // NOTE: sound be the is of the user, from auth in redux!
      if (message.user._id === 1) {
         iconColor = colors.accent.default;
         wrapperColor = colors.white;
      }

      return (
         <View style={[styles.MI, { backgroundColor: wrapperColor }]}>
            <Icon name="sound" color={iconColor} size={18} />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   MI: {
      alignSelf: "flex-end",
      marginRight: -5,
      marginTop: -5,
      height: 25,
      width: 25,
      borderRadius: 12.5,
      alignItems: "center",
      justifyContent: "center"
   }
});
