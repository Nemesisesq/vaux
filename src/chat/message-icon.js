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

      return (
         <View style={styles.MI}>
            <Icon name="sound" color={colors.white} size={18} />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   MI: {
      alignSelf: "flex-end",
      marginRight: -5,
      marginTop: -5,
      backgroundColor: colors.accent.default,
      height: 25,
      width: 25,
      borderRadius: 12.5,
      alignItems: "center",
      justifyContent: "center"
   }
});
