import React from 'react';
import {Text, View, StyleSheet, RefreshControl, ScrollView} from "react-native";
import {connect} from "react-redux";
import {colors} from "../config";

class GymsScreen extends React.Component {


    static navigationOptions = ({}) => ({
        title: __.t('GYMs'),
        headerTitleStyle: {width: '85%', textAlign: 'center', alignSelf: 'center', fontWeight: 'normal'}
    });

    componentWillReceiveProps(props) {
    }

    constructor(props) {
        super(props);
    }

    render() {
        let gyms = (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: '#fff'
            }}>
                <Text style={styles.noData}>{__.t('Not Available Now')}</Text>
            </View>
        );

        return (
            <ScrollView style={styles.container}
                        refreshControl={
                            <RefreshControl
                                refreshing={false}
                                onRefresh={() => {
                                }}
                                tintColor={colors.secondary}
                            />
                        }>
                <View style={{
                    width: '94%', flexDirection: 'row', marginTop: 10, marginBottom: 80,
                    marginHorizontal: '3%', justifyContent: 'center', alignItems: 'center'
                }}>
                    {gyms}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#323643',
        alignSelf: 'center',
        fontFamily: 'Cairo-Regular'

    },
    listContainer: {
        paddingHorizontal: 20
    },
    roundContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 40,
        paddingHorizontal: 10,
        borderRadius: 3,
        borderWidth: 0.5,
        borderStyle: "solid",
        borderColor: "#979797",
        textAlign: 'right',
        fontFamily: 'Cairo-Regular'
    },
    noData: {
        padding: 50,
        fontSize: 24,
        fontFamily: 'Cairo-Bold'
    }
});
const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading
    };
};

const mapDispatchToProps = () => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GymsScreen);