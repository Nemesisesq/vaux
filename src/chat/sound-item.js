import React, { Component } from "react";
import { Audio } from "expo";
import PropTypes from "prop-types";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import AppText from "../components/app-text";

import { colors, AppPropTypes } from "../constants";

export default class SoundItem extends Component {
   static propTypes = {
      sound: AppPropTypes.Sound.isRequired,
      onPress: PropTypes.func.isRequired
   };

   static defaultProps = {
      onPress: () => {}
   };

   _playSound = async () => {
      const sound = new Audio.Sound();
      try {
         await sound.loadAsync(this.props.sound.module);
         await sound.playAsync();
      } catch (error) {
         console.log("SOUND TAG: Error, unable to play sound");
      }
   };

   render() {
      const { sound } = this.props;

      return (
         <TouchableOpacity onPress={() => this.props.onPress(sound)}>
            <View style={styles.SI}>
               <View style={styles.SI__Inner}>
                  <View
                     style={[styles.SI__Icon, { backgroundColor: sound.color }]}
                  >
                     <TouchableOpacity onPress={this._playSound}>
                        <Icon name="sound" color={colors.white} size={25} />
                     </TouchableOpacity>
                  </View>
                  <View style={styles.SI__Text}>
                     <AppText>{sound.name}</AppText>
                  </View>
               </View>
            </View>
         </TouchableOpacity>
      );
   }
}

const styles = StyleSheet.create({
   SI: {
      alignSelf: "stretch"
   },
   SI__Icon: {
      borderRadius: 20,
      height: 40,
      width: 40,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10
   },
   SI__Inner: {
      borderBottomColor: colors.grey.light,
      borderBottomWidth: 2,
      marginHorizontal: 10,
      paddingVertical: 8,
      flexDirection: "row"
   },
   SI__Text: {
      flex: 1,
      alignItems: "flex-start",
      justifyContent: "center"
   }
});
