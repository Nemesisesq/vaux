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

export const BASE_URL = "ws://0.0.0.0:8080";

export const SOUNDS = {
   SOUND_1: {
      name: "Example Sound 1",
      module: require("../../assets/sounds/sample-sound-1.mp3"),
      color: colors.randomColor()
   },
   SOUND_2: {
      name: "Example Sound 2",
      module: require("../../assets/sounds/sample-sound-2.mp3"),
      color: colors.randomColor()
   },
   SOUND_3: {
      name: "Example Sound 3",
      module: require("../../assets/sounds/sample-sound-3.mp3"),
      color: colors.randomColor()
   },
   SOUND_4: {
      name: "Example Sound 4",
      module: require("../../assets/sounds/sample-sound-4.mp3"),
      color: colors.randomColor()
   },
   SOUND_5: {
      name: "Example Sound 5",
      module: require("../../assets/sounds/sample-sound-5.mp3"),
      color: colors.randomColor()
   }
};
