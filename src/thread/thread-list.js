import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, FlatList, StyleSheet } from "react-native";

import ThreadItem from "./thread-item";
import { generateSampleThreads } from "../utils/sample-data";
import { colors, AppPropTypes } from "../constants";

export default class ThreadList extends Component {
   static propTypes = {
      threads: PropTypes.arrayOf(AppPropTypes.Thread).isRequired
   };

   static defaultProps = {
      // threads: [],
      threads: generateSampleThreads(10, 1)
   };

   _rowSelected = notification => {
      // TODO: open chat thread
   };

   _renderItem = ({ item }) => {
      return <ThreadItem thread={item} />;
   };

   _keyExtractor = item => item.id;

   render() {
      return (
         <View style={styles.TL}>
            <FlatList
               style={styles.TL__List}
               data={this.props.threads}
               keyExtractor={this._keyExtractor}
               renderItem={this._renderItem}
            />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   TL: {
      flex: 1,
      alignSelf: "stretch"
   },
   TL__List: {
      flex: 1,
      backgroundColor: colors.grey.extraLight
   }
});
