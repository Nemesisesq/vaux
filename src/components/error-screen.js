import React, { Component } from "react";
import PropTypes from "prop-types";

import { colors } from "../constants";
import ListEmpty from "./list-empty";

export default class ErrorScreen extends Component {
   static propTypes = {
      text: PropTypes.string.isRequired
   };

   static defaultProps = {
      text: "An error occurred 😭"
   };

   render() {
      return (
         <ListEmpty
            text={this.props.text}
            backgroundColor={colors.primary.default}
         />
      );
   }
}
