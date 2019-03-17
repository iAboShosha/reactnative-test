import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    TextInput,
    RefreshControl,
    Image
} from "react-native";
import {connect} from "react-redux";
import {cloneDeep} from "lodash";
import {colors, font} from "../config";
import {getHealthyFoods, resetPage} from "../store/actions/healthy-foods";


class HealthyFoodsScreen extends React.Component {
    static navigationOptions = ({}) => ({
        title: 'Healthy Foods',
        headerTitleStyle: {width: '85%', textAlign: 'center', alignSelf: 'center', fontWeight: 'normal'}
    });

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
        };
        this.props.onGetHealthyFoods()
    }

    _renderItem = ({item}) => {
        return (
            <Image style={styles.imageStyle}
                   source={!!item.urls.full ? {uri: item.urls.full} : require('../assets/images/splash.png')}
            />
        );
    };

    onRefresh(refreshing) {
        this.setState({refreshing: refreshing});
        this.props.onGetHealthyFoods().then(() => {
            this.setState({refreshing: false});
        })
            .catch(() => {
                this.setState({refreshing: false});
            });
    }

    render() {
        let foods = (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: '#fff'
            }}>
                <Text style={styles.noData}>Not Available Now</Text>
            </View>
        );

        if (this.props.foods && this.props.foods.length > 0) {
            foods = (
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                this.props.onResetPage();
                                this.onRefresh(true);
                            }}
                            tintColor={colors.secondary}
                        />
                    }
                    style={styles.listContainer}
                    data={this.props.foods}
                    extraData={this.state}
                    renderItem={this._renderItem}
                    keyExtractor={(x, i) => i.toString()}
                    onEndReached={() => this.onRefresh(true)}
                    onEndReachedThreshold={0.1}
                />
            );
        }

        return (
            <View style={styles.container}>
                <View style={{
                    width: '84%', flexDirection: 'row', marginTop: 10,
                    marginHorizontal: '8%', justifyContent: 'center', alignItems: 'center'
                }}>
                    <TextInput style={styles.roundContainer}
                               placeholder="Search"
                               placeholderTextColor={'#848484'}
                               underlineColorAndroid='transparent'
                               onChangeText={text => {
                                   // this.props.onGetAllTypes(text)
                                   // this.props.onGetAllCategories(text)
                               }}
                    />
                </View>
                <View style={{
                    height: '100%',
                    width: '100%',
                    marginTop: '5%',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {foods}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20,
        flexDirection: 'column',
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 18,
        color: '#3569c3',
        alignSelf: 'center',
        fontFamily: font.fontFamily
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
        marginBottom: 70,
    },
    roundContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 40,
        paddingHorizontal: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#887A5F",
        textAlign: 'left',
        fontFamily: font.fontFamily
    },
    noData: {
        padding: 50,
        fontSize: 24,
        fontFamily: 'Cairo-Bold'
    },
    imageStyle: {
        width: 320,
        height: 100,
        paddingBottom: 5,
        marginBottom: 5,
        alignSelf: 'center',
    }
});

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        currentUser: state.user.user,
        foods: state.healthyFoods.foods
    };
};


const mapDispatchToProps = dispatch => {
    return {
        onGetHealthyFoods: () => dispatch(getHealthyFoods()),
        onResetPage: () => dispatch(resetPage())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HealthyFoodsScreen);