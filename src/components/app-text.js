import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";

import { colors } from "../constants";

export default class AppText extends Component {
   static propTypes = {
      color: PropTypes.string.isRequired
   };

   static defaultProps = {
      color: colors.text.primary
   };

   render() {
      const { children, style: addedStyles, ...props } = this.props;
      const styles = {
         color: this.props.color,
         fontSize: 14
      };

      return (
         <Text style={[styles, addedStyles]} {...props}>
            {children}
         </Text>
      );
   }
}
