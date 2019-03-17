import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";

const TextBoxWithCheck = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.circle,{borderColor: props.selected?'mediumseagreen':'lightgray'}]}
        onPress={props.onPress}
      >
        {props.selected?<FontAwesome name="check" size={24} color='mediumseagreen'/>:null}
      </TouchableOpacity>
      <View>
        <Text style={{fontSize: 18}}>{props.text}</Text>
      </View>
    </View>
  )
};

export default TextBoxWithCheck;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 0.5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  circle: {
    height: 36,
    width: 36,
    borderRadius: 18,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  }
})
