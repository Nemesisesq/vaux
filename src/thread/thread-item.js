import React, { Component } from "react";
import PropTypes from "prop-types";
import {
   StyleSheet,
   ImageBackground,
   Image,
   View,
   TouchableOpacity
} from "react-native";

import AppText from "../components/app-text";
import { colors, AppPropTypes } from "../constants";

export default class ThreadItem extends Component {
   static propTypes = {
      thread: AppPropTypes.Thread.isRequired
   };

   render() {
      const { thread } = this.props;

      return (
         <TouchableOpacity style={styles.TI} onPress={this.props.onPress}>
            <View style={styles.TI__ThumbnailWrapper}>
               <Image
                  style={styles.TI__Thumbnail}
                  source={{ uri: thread.imageURL }}
               />
               {this.props.read && (
                  <View style={styles.TI__Thumbnail__ReadIcon} />
               )}
            </View>
            <View style={styles.TI__Content}>
               <View style={styles.TI__ContentInner}>
                  <AppText bold style={styles.Main__Name}>
                     {thread.name}
                  </AppText>
                  <AppText style={styles.Main__Date}>
                     {thread.date.format("MM/DD/YYYY h:mm a")}
                  </AppText>
               </View>
               <AppText style={styles.Main__Message}>
                  {thread.messages[0].text.slice(0, 35)}...
               </AppText>
            </View>
         </TouchableOpacity>
      );
   }
}

const styles = StyleSheet.create({
   TI: {
      backgroundColor: colors.white,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.grey.extraLight,
      flexDirection: "row",
      alignItems: "center"
   },

   TI__ThumbnailWrapper: {
      marginRight: 20
   },
   TI__Thumbnail: {
      height: 50,
      width: 50,
      borderRadius: 25,
      backgroundColor: colors.grey.extraLight
   },
   TI__Thumbnail__ReadIcon: {
      height: 18,
      width: 18,
      borderRadius: 9,
      backgroundColor: colors.primary.default,
      borderWidth: 3,
      borderColor: "#fff",
      alignSelf: "flex-end",
      marginTop: -20,
      marginRight: -7
   },

   TI__Content: {
      flex: 1
   },
   TI__ContentInner: {
      flexDirection: "row",
      justifyContent: "space-between"
   },
   Main__Name: {
      marginBottom: 5,
      fontSize: 16
   },
   Main__Date: {
      color: colors.grey.light
   },
   Main__Message: {
      color: colors.grey.medium
   }
});
