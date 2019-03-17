import React from "react";
import {StyleSheet, TouchableHighlight} from "react-native";
import LinearGradient from 'react-native-linear-gradient';

const FloatingButton = props => {
    return (
        <TouchableHighlight style={styles.container} onPress={props.onPress}>
            <LinearGradient id="grad" colors={['#b86ab1', '#974ea8']} start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 0.0}} style={styles.lGradient}>
                {props.icon}
            </LinearGradient>
        </TouchableHighlight>
    );
};

export default FloatingButton;

const styles = StyleSheet.create({
    container: {
        height: 60,
        width: 60,
        //backgroundColor: "mediumorchid",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        zIndex: 2,
        bottom: "3%",
        left: "4%",
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 7
    },
    lGradient:{
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center"
    }
});
