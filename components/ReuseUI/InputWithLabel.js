import React from 'react';
import {View, Text, StyleSheet, TextInput, KeyboardAvoidingView} from 'react-native';

const InputWithLabel = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{props.label}</Text>
            <View style={styles.roundContainer}>
                <View>
                    {props.leftIcon}
                </View>
                <TextInput
                    editable={props.editable}
                    keyboardType={props.keyboardType}
                    secureTextEntry={props.secureTextEntry}
                    style={props.settingScreenColor === "yes" ? styles.settingsInput : styles.input}
                    onChangeText={props.onChangeText}
                    value={props.value}
                    placeholder={props.placeholder}
                    placeholderTextColor={props.settingScreenColor ? '#b37fbe' : '#C7C7CD'}
                    underlineColorAndroid='transparent'
                />
            </View>

        </View>
    )
};

export default InputWithLabel;

const styles = StyleSheet.create({
    container: {
        width: '90%',
        marginVertical: 10,
        justifyContent: 'center',
    },
    label: {
        textAlign: 'left',
        paddingHorizontal: 15,
        paddingVertical: 5,
        fontSize: 20,
        color: '#5E5E5E'
    },
    roundContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: 'white',
        height: 60,
        borderRadius: 30,
        borderWidth: 0.8,
        borderStyle: "solid",
        borderColor: "#f0f2f3"
    },
    input: {
        flex: 1,
        textAlign: 'left',
        fontSize: 18
    },
    settingsInput: {
        flex: 1,
        color: '#b37fbe',
        textAlign: 'left',
        fontSize: 15
    }
});
