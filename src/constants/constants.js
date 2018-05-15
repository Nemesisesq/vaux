import colors from "./colors";

export const navStyles = {
   // dimensions
   buttonMargin: 12,
   buttonSize: 32,

   // full styles
   primary: {
      headerStyle: {
         backgroundColor: colors.primary.default,
         borderBottomColor: "transparent"
      },
      headerTintColor: colors.white,
      headerTitleStyle: {
         fontSize: 24
      }
   }
};

export const SOUNDS = {
   SOUND_1: require("../../assets/sounds/sample-sound-1.mp3"),
   SOUND_2: require("../../assets/sounds/sample-sound-2.mp3"),
   SOUND_3: require("../../assets/sounds/sample-sound-3.mp3"),
   SOUND_4: require("../../assets/sounds/sample-sound-4.mp3"),
   SOUND_5: require("../../assets/sounds/sample-sound-5.mp3")
};
