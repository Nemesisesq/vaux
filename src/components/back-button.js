import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { colors, navStyles } from "../constants";

const BackButton = ({ onPress }) => (
   <TouchableOpacity
      style={{ marginLeft: navStyles.buttonMargin }}
      onPress={onPress}
   >
      <Icon
         name="ios-arrow-back-outline"
         color={colors.white}
         size={navStyles.buttonSize}
      />
   </TouchableOpacity>
);

export default BackButton;
