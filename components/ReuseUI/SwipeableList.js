import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { SwipeRow } from "react-native-swipe-list-view";
import EvilIcons from "react-native-vector-icons/EvilIcons";

const SwipeableList = props => {
  return (
    <View style={styles.container}
    >
      <SwipeRow
        onRowOpen={props.onRowOpen}
        onRowClose={props.onRowClose}
        disableLeftSwipe={true}
        leftOpenValue={150}
      >
        <View style={styles.hidden}>
          <TouchableOpacity style={{height: '90%', paddingHorizontal: 10}} onPress={props.onDelete}>
            <EvilIcons name="trash" size={30} color='white'/>
          </TouchableOpacity>

          <View style={{borderRightWidth: 0.5, height: '85%', borderColor: 'darkviolet'}}></View>
          <TouchableOpacity style={{height: '90%', paddingHorizontal: 10}} onPress={props.onEdit}>
            <EvilIcons name="pencil" size={30} color='white'/>
          </TouchableOpacity>
        </View>
        <View style={[styles.roundContainer,{width: props.dynamicWidth}]}>
          {props.showIcon?props.icon:null}
          <Text style={styles.text}>{props.text}</Text>
        </View>
      </SwipeRow>
    </View>
  );
};

export default SwipeableList;

const styles = StyleSheet.create({
  container: {
    width: '95%',
    justifyContent: 'center',
  },
  hidden: {
    flexDirection: 'row',
    backgroundColor: 'mediumorchid',
    width: '35%',
    height: 40,
    borderRadius: 20,
    // alignItems: 'center',
    paddingTop: 8,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    top: 10,
    left: 3,
  },
  roundContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
    height: 60,
    borderRadius: 30
  },
  text: {
    position: 'absolute',
    zIndex: 2,
    right: '7%',
    fontSize: 16,
  }
});
