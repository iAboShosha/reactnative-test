import React from 'react';
import {AppRegistry, Platform, StatusBar, StyleSheet, View} from 'react-native';
import {AppLoading, Font, Icon} from 'expo';
import {AppNavigator} from './navigation/AppNavigator';
import {Provider} from "react-redux";
import configureStore from "./store/configureStore";

if (typeof GLOBAL.self === "undefined") {
    GLOBAL.self = GLOBAL;
}

export default class App extends React.Component {
    state = {
        isLoadingComplete: false,
    };

    render() {
        if (!this.state.isLoadingComplete && !this.props['skipLoadingScreen']) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        } else {
            return (
                <Provider store={configureStore()}>
                    <View style={styles.container}>
                        {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
                        <AppNavigator/>
                    </View>
                </Provider>
            );
        }
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            /*Asset.loadAsync([
                require('./assets/images/robot-dev.png'),
                require('./assets/images/robot-prod.png'),
            ]),*/
            Font.loadAsync({
                // This is the font that we are using for our tab bar
                ...Icon.Ionicons.font,
                // We include SpaceMono because we use it in HomeScreen.js. Feel free
                // to remove this if you are not using it in your app
                'Cairo-Bold': require('./assets/fonts/Cairo-Bold.ttf'),
                'Cairo-Regular': require('./assets/fonts/Cairo-Regular.ttf'),
                'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
            })
        ]);
    };

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({isLoadingComplete: true});
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

AppRegistry.registerComponent('physicaltraining', App, true);