import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";

import { colors } from "../constants";
import AppText from "./app-text";

export default class ListEmpty extends Component {
   static propTypes = {
      text: PropTypes.string.isRequired,
      backgroundColor: PropTypes.string.isRequired
   };

   static defaultProps = {
      backgroundColor: colors.primary.extraFaded
   };

   render() {
      return (
         <View
            style={[styles.LE, { backgroundColor: this.props.backgroundColor }]}
         >
            <View style={styles.LE__Inner}>
               <AppText style={styles.LE__Text}>{this.props.text}</AppText>
            </View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   LE: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
   },
   LE__Inner: {
      backgroundColor: colors.white,
      paddingHorizontal: 35,
      paddingVertical: 20,
      borderRadius: 8
   },
   LE__Text: {
      fontWeight: "bold",
      fontSize: 14
   }
});
