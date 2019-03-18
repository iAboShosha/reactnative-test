import React, {Component} from "react";
import {connect} from "react-redux";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    ActivityIndicator,
    TextInput,
    Alert
} from "react-native";

import validate from "../utility/validation";
import {updateUser, authLogout, changePassword} from "../store/actions";
import {colors, font} from "../config";
import Toast from 'react-native-easy-toast';
import {Dropdown} from 'react-native-material-dropdown';
import {getLanguages} from "../store/actions/lock-ups";
// import { Localization } from 'expo';
// import * as Localization from 'expo-localization';
// import i18n from 'i18n-js';
/*const en = {
    foo: 'Foo',
    bar: 'Bar {{someValue}}',
};
const ar = {
    foo: 'como telle fous',
    bar: 'chatouiller {{someValue}}',
};*/

class SettingsScreen extends Component {

    static navigationOptions = ({}) => ({
        title: 'Settings',
        headerTitleStyle: {width: '100%', textAlign: 'center', alignSelf: 'center', fontWeight: 'normal'}
    });

    constructor(props) {
        super(props);
        /*i18n.fallbacks = true;
        i18n.translations = { ar, en };
        i18n.locale = Localization.locale;*/
        this.state = {
            hasError: false,
            controls: {
                userName: {
                    value: this.props.currentUser.name,
                    valid: !!this.props.currentUser.name,
                    touched: false,
                    validationRules: {
                        notEmpty: true
                    }
                },
                email: {
                    value: this.props.currentUser.email,
                    valid: !!this.props.currentUser.email,
                    validationRules: {},
                    touched: false
                },
                language: {
                    value: this.props.currentUser.languageId,
                    valid: !!this.props.currentUser.languageId,
                    touched: false,
                    validationRules: {}
                },
                avatar: {
                    value: this.props.currentUser.avatar,
                    valid: !!this.props.currentUser.avatar,
                    touched: false,
                    validationRules: {}
                },
                password: {
                    value: '',
                    valid: false,
                    validationRules: {
                        minLength: 6,
                        notEmpty: true
                    },
                    touched: false
                },
                newPassword: {
                    value: '',
                    valid: false,
                    validationRules: {
                        minLength: 6,
                        notEmpty: true
                    },
                    touched: false
                },
            }
        };
        this.props.onGetLanguages();
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
        if (key === "password") {
            connectedValue = {
                ...connectedValue,
                equalTo: value
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
        if (!this.state.controls.userName.valid) {
            console.log('invalid values', this.state.controls);
            this.setState({hasError: true});
        } else {
            this.setState({hasError: false});
            const newData = {
                name: this.state.controls.userName.value,
                email: this.state.controls.email.value,
                languageId: this.state.controls.language.value,
                avatar: this.state.controls.avatar.value,
            };
            if (this.state.controls.password.valid && this.state.controls.newPassword.valid) {
                const authData = {
                    newPassword: this.state.controls.newPassword.value,
                    password: this.state.controls.password.value
                };
                this.setState(prevState => {
                    return {
                        controls: {
                            ...prevState.controls,
                            password: {
                                ...prevState.controls.password,
                                value: '',
                                valid: false,
                                touched: false
                            },
                            newPassword: {
                                ...prevState.controls.newPassword,
                                value: '',
                                valid: false,
                                touched: false
                            },
                        }
                    };
                });
                this.props.onChangePassword(authData);
            }
            this.props.onUpdateUser(newData).then(() => {
                this.refs.toast.show('تم تعديل حسابك بنجاح', 500, () => {
                    this.props.navigation.navigate('Home');
                });

            });
        }
    };

    render() {

        let submitButton = (
            <View style={{flexDirection: 'row', marginTop: 30}}>
                <TouchableOpacity style={{
                    marginHorizontal: '10%',
                    backgroundColor: '#BDBDBD',
                    width: '90%',
                    flex: 1,
                    height: 35,
                    marginBottom: 20,
                    borderRadius: 10
                }}
                                  onPress={() => this.authHandler()}>
                    <Text style={{
                        fontSize: 18,
                        alignSelf: 'center',
                        textAlign: 'center', color: colors.background,
                        fontFamily: 'Cairo-Regular'
                    }}>Save</Text>
                </TouchableOpacity>
            </View>);
        if (this.props.isLoading) {
            submitButton = (
                <View style={{flexDirection: 'row', marginTop: 30}}>
                    <TouchableOpacity style={{
                        marginHorizontal: '10%',
                        backgroundColor: '#BDBDBD',
                        width: '90%',
                        flex: 1,
                        height: 35,
                        marginBottom: 20,
                        borderRadius: 10
                    }}
                    >
                        <ActivityIndicator color='#FFF'/>
                    </TouchableOpacity>
                </View>);
        }

        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled keyboardVerticalOffset={120}>
                <ScrollView
                    style={{width: "100%"}}
                    contentContainerStyle={styles.scrollView}>
                    <Text>
                        {i18n.t('foo')} {i18n.t('bar', { someValue: Date.now() })}
                    </Text>
                    <View style={styles.titleContainer}>
                        <Text
                            style={[styles.title, this.state.hasError && !this.state.controls.userName.valid ? {color: colors.error} : {}]}>
                            Username</Text>
                    </View>
                    <View style={styles.roundContainer}>
                        <TextInput
                            style={{
                                fontSize: 16, color: colors.primary_font, textAlign: 'left',
                                fontFamily: font.fontFamily
                            }}
                            placeholder="username"
                            placeholderTextColor={colors.secondary_font}
                            value={this.state.controls.userName.value}
                            onChangeText={text => this.onChangeTextHandler("userName", text)}
                            underlineColorAndroid='transparent'
                        />
                    </View>
                    {this.state.hasError && !this.state.controls.userName.valid && (
                        <Text style={{
                            color: colors.error, textAlign: 'left', width: '90%',
                            fontFamily: font.fontFamily
                        }}> userName is required </Text>
                    )}
                    <View style={styles.titleContainer}>
                        <Text
                            style={[styles.title, this.state.hasError && !this.state.controls.email.valid ? {color: colors.error} : {}]}>
                            Email</Text>
                    </View>
                    <View style={styles.roundContainer}>
                        <TextInput
                            style={{
                                fontSize: 16, color: colors.primary_font, textAlign: 'left',
                                fontFamily: font.fontFamily
                            }}
                            placeholder=" Email"
                            placeholderTextColor={colors.secondary_font}
                            value={this.state.controls.email.value}
                            onChangeText={text => this.onChangeTextHandler("email", text)}
                            keyboardType="email-address"
                            underlineColorAndroid='transparent'
                            editable={false}
                        />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text
                            style={[styles.title, this.state.hasError && !this.state.controls.city.valid ? {color: colors.error} : {}]}>
                            Language
                        </Text>
                    </View>
                    <View style={styles.roundContainer}>
                        <Dropdown
                            textAlign='left'
                            textColor={colors.primary_font}
                            containerStyle={{
                                marginTop: -10, width: '100%'
                            }}
                            itemPadding={10}
                            itemTextStyle={{
                                fontSize: 14,
                                textAlign: 'left',
                                color: colors.secondary_font,
                                fontFamily: font.fontFamily
                            }}
                            data={this.props.languages}
                            value={this.state.controls.language.value}
                            onChangeText={val => this.onChangeTextHandler("language", val)}
                        />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text
                            style={[styles.title, this.state.hasError && !this.state.controls.password.valid ? {color: colors.error} : {}]}>
                            Current Password </Text>
                    </View>
                    <View style={styles.roundContainer}>
                        <TextInput
                            style={{
                                fontSize: 16, color: colors.primary_font, textAlign: 'left',
                                fontFamily: font.fontFamily
                            }}
                            secureTextEntry={true}
                            value={this.state.controls.password.value}
                            onChangeText={text => this.onChangeTextHandler("password", text)}
                            underlineColorAndroid='transparent'
                        />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text
                            style={[styles.title, this.state.hasError && !this.state.controls.newPassword.valid ? {color: colors.error} : {}]}>
                            New Password </Text>
                    </View>
                    <View style={styles.roundContainer}>
                        <TextInput
                            style={{
                                fontSize: 16, color: colors.primary_font, textAlign: 'left',
                                fontFamily: font.fontFamily
                            }}
                            secureTextEntry={true}
                            value={this.state.controls.newPassword.value}
                            onChangeText={text => this.onChangeTextHandler("newPassword", text)}
                            underlineColorAndroid='transparent'
                        />
                    </View>
                    {submitButton}
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={{
                            marginHorizontal: '10%',
                            backgroundColor: '#BDBDBD',
                            width: '90%',
                            flex: 1,
                            height: 35,
                            marginBottom: 20,
                            borderRadius: 10
                        }} onPress={() =>
                            Alert.alert(
                                'Log out',
                                'Are you sure to log out?',
                                [
                                    {
                                        text: 'cancel',
                                        onPress: () => {
                                        },
                                        style: 'cancel'
                                    },
                                    {
                                        text: 'confirm', onPress: () => {
                                            this.props.onAuthLogout()
                                        }
                                    },
                                ]
                            )
                        }>
                            <Text style={{
                                fontSize: 18,
                                alignSelf: 'center',
                                textAlign: 'center', color: colors.background,
                                fontFamily: 'Cairo-Regular'
                            }}>Log out</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <Toast
                    ref="toast"
                    positionValue={2}
                    position='center'/>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 10,
        backgroundColor: colors.background
    },
    scrollView: {
        alignItems: "center",
        paddingBottom: '30%'
    },
    textAreaContainer: {
        height: 150,
        padding: 5,
        width: 330,
        marginLeft: 10,
        marginRight: 10
    },
    textArea: {
        justifyContent: 'space-between',
        textAlignVertical: 'top',  // hack android
        textAlign: 'left',
        height: 110,
        fontSize: 14,
        paddingHorizontal: 10,
        borderRadius: 2,
        borderWidth: 0.8,
        borderStyle: "solid",
        borderColor: "#f1f1f1",
        flex: 1,
        fontFamily: font.fontFamily,
    },
    roundContainer: {
        width: '90%',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        paddingVertical: 10,
        borderBottomWidth: 0.8,
        borderStyle: "solid",
        borderBottomColor: colors.border
    },
    whiteButton: {
        borderRadius: 5,
        flex: 1,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.shadow,
        shadowOffset: {height: 5, width: 10},
        shadowColor: colors.shadow,
        shadowOpacity: 1,
        shadowRadius: 50,
    },
    titleContainer: {
        width: '90%',
        paddingVertical: 3,
        marginTop: 20,
        flex: 1
    },
    title: {
        color: '#88889c',
        fontSize: 14,
        textAlign: 'left',
        fontFamily: font.fontFamily
    },
    titlelg: {
        color: '#323643',
        fontSize: 18,
        textAlign: 'left',
        fontFamily: font.fontFamilyBold
    },
    loading: {
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
    label: {
        textAlign: 'left',
        paddingHorizontal: 15,
        paddingVertical: 5,
        fontSize: 20,
        color: '#5E5E5E'
    },
    accordionHeader: {
        padding: 10,
        borderBottomWidth: 0.5,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#a9a9a9',
        backgroundColor: '#fff',
    }
});

const mapStateToProps = state => {
    return {
        currentUser: state.user.user,
        isLoading: state.ui.isLoading,
        languages: state.lockUps.languages,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateUser: (authData) => dispatch(updateUser(authData)),
        onAuthLogout: () => dispatch(authLogout()),
        onGetLanguages: () => dispatch(getLanguages()),
        onChangePassword: (authData) => dispatch(changePassword(authData)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
