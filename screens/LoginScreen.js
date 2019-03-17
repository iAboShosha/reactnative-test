import React, {Component} from "react";
import {
    View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, ScrollView
} from "react-native";
import validate from "../utility/validation";
import {connect} from "react-redux";
import {authAutoSignIn, authSignIn} from "../store/actions";
import {YellowBox} from 'react-native';
import {colors, font} from "../config";
import {Feather} from '@expo/vector-icons';

YellowBox.ignoreWarnings(['Class RCTCxxModule', 'Class GenericShare', 'Class WhatsAppShare', 'Class GooglePlusShare']);

class LoginScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        modalVisible: false,
        forgotPassword: "",
        hasError: false,
        controls: {
            email: {
                value: "user@physicalTraining.com",
                valid: true,
                validationRules: {
                    isEmail: true
                },
                touched: false
            },
            password: {
                value: "123456",
                valid: true,
                validationRules: {
                    minLength: 6
                },
                touched: false
            }
        }
    };

    componentWillMount() {
        this.props.onAutoSignIn()
    }

    onChangeTextHandler = (key, value) => {
        let connectedValue = {};
        if (this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            };
        }

        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(
                            value,
                            prevState.controls[key].validationRules,
                            connectedValue
                        ),
                        touched: true
                    }
                }
            };
        });
    };

    authHandler = () => {
        if ((!this.state.controls.email.valid) ||
            (!this.state.controls.password.valid)) {
            this.setState({hasError: true});
            console.log('invalid values', this.state.controls)
        } else {
            this.setState({hasError: false});
            const authData = {
                email: this.state.controls.email.value,
                password: this.state.controls.password.value
            };
            this.props.onSignIn(authData).then(() => {
                // console
            })
        }
    };


    render() {
        let submit = (
            <View style={styles.loginButton}>
                <TouchableOpacity onPress={() => this.authHandler()}>
                    <Feather name="arrow-right" size={40} style={styles.generalButtonIcon}/>
                </TouchableOpacity>
            </View>
        );
        if (this.props.isLoading) {
            submit = (<View style={styles.loginButton}>
                <ActivityIndicator color='#FFF'/>
            </View>);
        }
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <ScrollView style={{
                    flex: 1,
                    width: "100%",
                    marginBottom: 30,
                    flexDirection: "column",
                    backgroundColor: '#fff'
                }}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titlelg}>Sign in</Text>
                    </View>
                    <View style={styles.titleContainer}>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput}
                            value={this.state.controls.email.value}
                            placeholder="Email"
                            placeholderTextColor={colors.secondary_font}
                            keyboardType="email-address"
                            onChangeText={text => this.onChangeTextHandler("email", text)}
                            underlineColorAndroid='transparent'
                        />
                    </View>
                    {this.state.hasError && !this.state.controls.email.valid && (
                        <Text style={styles.invalidData}>Email required</Text>
                    )}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput}
                            value={this.state.controls.password.value}
                            placeholder="Password"
                            placeholderTextColor={colors.secondary_font}
                            secureTextEntry={true}
                            onChangeText={text => this.onChangeTextHandler("password", text)}
                            underlineColorAndroid='transparent'
                        />
                    </View>
                    {this.state.hasError && !this.state.controls.password.valid && (
                        <Text style={styles.invalidData}>Password Required</Text>
                    )}

                    {/*<View style={{width: "100%", marginTop: 20, marginBottom: 20, alignItems: "center"}}>
                        <TouchableOpacity
                            style={{
                                borderBottomWidth: 2,
                                borderBottomColor: "#ff5050",
                            }}
                            onPress={() => {
                                this.props.navigation.navigate("ForgetPasswordScreen")
                            }}>
                            <Text style={{
                                fontSize: 13,
                                color: "#ff5050",
                                fontWeight: "400",
                                paddingBottom: 0
                            }}>
                                FORGET PASSWORD ?</Text>
                        </TouchableOpacity>
                    </View>*/}
                </ScrollView>
                {submit}
            </KeyboardAvoidingView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width: "70%",
        marginLeft: "15%",
        marginRight: "10%",
        borderBottomWidth: 1,
        borderColor: "#AAA",
        marginBottom: 30
    },
    textInput: {
        paddingVertical: 8,
        paddingRight: 8,
        fontSize: 16,
    },
    roundBtn: {
        flex: 1,
        flexDirection: "row",
        marginTop: 30,
        alignItems: 'center',
        marginLeft: "35%",
    },
    socialRoundBtn: {
        marginRight: 30,
        backgroundColor: "#000",
        width: 40,
        height: 40,
        borderRadius: 50,
        textAlign: "center",
        paddingTop: 12,
        paddingBottom: 9
    },
    titleContainer: {
        width: '90%',
        //paddingVertical: 3,
        //marginTop: 20,
    },
    titlelg: {
        marginTop: 20,
        paddingTop: 70,
        fontWeight: "100",
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 40
    },
    generalButton: {
        backgroundColor: "#040102",
        padding: 10,
        marginLeft: "15%",
        width: "70%",
        marginTop: 10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    generalButtonIcon: {
        textAlign: "center",
        color: "#FFF"
    },
    emailButtonText: {
        textAlign: "left",
        color: "#FFF",
        fontSize: 14,
        fontWeight: "bold",
        paddingLeft: 20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        flex: 1
    },
    emailButtonIcon: {
        color: "#FFF",
        marginLeft: 15,
        paddingLeft: 15,
        borderLeftWidth: 1,
        borderLeftColor: "#FFF",
        flexDirection: "column",
        flex: 0.2
    },
    loginButton: {
        width: "100%",
        backgroundColor: "#000",
        height: 50,
        paddingTop: 9,
    },
    invalidData: {
        color: colors.error,
        textAlign: 'left',
        width: '90%',
        marginLeft: "15%",
        fontFamily: font.fontFamily
    }
});

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        currentUser: state.user.user,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSignIn: (authData) => dispatch(authSignIn(authData)),
        onAutoSignIn: () => dispatch(authAutoSignIn()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);