import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import EIcon from "react-native-vector-icons/Entypo";
import FIcon from "react-native-vector-icons/Foundation";
import Modal from "react-native-modal";

import { colors, AppPropTypes, SOUNDS } from "../constants";
import SoundItem from "./sound-item";
import AppText from "../components/app-text";

export default class SoundPalette extends Component {
   static propTypes = {
      onSelection: PropTypes.func.isRequired,
      activeSound: AppPropTypes.Sound
   };

   static deaultProps = {
      onSelection: () => {}
   };

   constructor(props) {
      super(props);
      this.state = {
         paletteOpen: false
      };
   }

   _toggleSoundPalette = () => {
      this.setState({ paletteOpen: !this.state.paletteOpen });
   };

   _soundSelected = sound => {
      this.props.onSelection(sound);
      this._toggleSoundPalette();
   };

   _keyExtractor = item => item.name;

   _renderItem = ({ item }) => {
      return <SoundItem sound={item} onPress={this._soundSelected} />;
   };

   render() {
      let spIconWrapperStyle = {};
      let spIconColor = colors.accent.default;
      const { activeSound } = this.props;
      if (activeSound) {
         spIconWrapperStyle.backgroundColor = activeSound.color;
         spIconColor = colors.white;
      }
      return (
         <View style={styles.SP}>
            {/* Icon */}
            <TouchableOpacity
               style={[styles.SP__Icon, spIconWrapperStyle]}
               onPress={this._toggleSoundPalette}
            >
               <EIcon name="sound" color={spIconColor} size={20} />
            </TouchableOpacity>

            {/* Modal */}
            <Modal isVisible={this.state.paletteOpen}>
               <View style={styles.Modal}>
                  <View style={styles.Modal__Inner}>
                     <TouchableOpacity
                        style={styles.Modal__Close}
                        onPress={this._toggleSoundPalette}
                     >
                        <FIcon name="x" color={colors.black} size={20} />
                     </TouchableOpacity>
                     <AppText style={styles.Modal__Header}>
                        Select a sound to attach to your message
                     </AppText>
                     <FlatList
                        style={styles.Sound__List}
                        data={Object.values(SOUNDS)}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                     />
                     <TouchableOpacity
                        style={styles.Modal__Remove}
                        onPress={() => this._soundSelected(null)}
                     >
                        <EIcon
                           style={styles.MuteIcon}
                           name="sound-mute"
                           color={colors.white}
                           size={20}
                        />
                        <AppText color={colors.white}>Remove Sound</AppText>
                     </TouchableOpacity>
                  </View>
               </View>
            </Modal>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   SP: {
      width: 50,
      alignSelf: "stretch",
      backgroundColor: colors.white,
      alignItems: "center",
      justifyContent: "center"
   },
   SP__Icon: {
      height: 30,
      width: 30,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center"
   },
   Modal: {
      flex: 1
   },
   Modal__Close: {
      alignSelf: "flex-end"
   },
   Modal__Inner: {
      flex: 1,
      padding: 10,
      marginHorizontal: 15,
      marginVertical: 50,
      backgroundColor: colors.white,
      borderRadius: 10
   },
   Modal__Header: {
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
      marginVertical: 8
   },
   Sound__List: {
      flex: 1
   },
   Modal__Remove: {
      alignSelf: "stretch",
      backgroundColor: colors.grey.medium,
      height: 40,
      borderRadius: 5,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
   },
   MuteIcon: {
      marginRight: 15
   }
});
