import React from 'react';
import {
    StyleSheet,
    View,
    RefreshControl, Text, FlatList,
} from 'react-native';
import {connect} from "react-redux";
import {colors} from "../config";
import Card from "../components/Card";
import {getPhysicalTrainings} from "../store/actions/physical-trainings";

class HomeScreen extends React.Component {
    static navigationOptions = ({}) => ({
        headerTitle: __.t('Physical training'),
        headerTitleStyle: {width: '100%', textAlign: 'center', alignSelf: 'center', fontWeight: 'normal'}
    });

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
        };
        this.props.onGetPhysicalTraining();
    }

    openPhysicalTrainingDetails = (physicalTraining) => {
        this.props.navigation.navigate("PhysicalTraining", {physicalTraining: physicalTraining});
    };

    _renderItem = ({item, index}, parallaxProps) => {
        return (
            <Card
                openPhysicalTrainingItem={() => this.openPhysicalTrainingDetails(item)}
                data={item}
                even={(index + 1) % 2 === 0}
                parallax={true}
                parallaxProps={parallaxProps}/>
        );
    };

    onRefresh() {
        this.setState({refreshing: true});
        this.props.onGetPhysicalTraining().then(() => {
            this.setState({refreshing: false});
        })
            .catch(() => {

                this.setState({refreshing: false});
            });
    }

    render() {
        let physicalTrainings = (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor: '#fff'
            }}>
                <Text style={styles.noData}>{__.t('Not Available Now')}</Text>
            </View>
        );

        if (this.props.physicalTrainings && this.props.physicalTrainings.length > 0) {
            physicalTrainings = (
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                this.onRefresh(true);
                            }}
                            tintColor={colors.secondary}
                            //colors={[colors.secondary]}
                        />
                    }
                    style={styles.listContainer}
                    data={this.props.physicalTrainings}
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
                <View style={{flex: 1, flexDirection: 'column', paddingBottom: 30}}>
                        {physicalTrainings}
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        paddingTop: 0,
        backgroundColor: '#fff',
        paddingBottom: 20
    },
    noteText: {
        textAlign: 'right',
        marginHorizontal: 7,
        marginVertical: 8,
        color: '#5E5E5E',
        fontSize: 13,
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
    },
    userName: {
        fontSize: 24,
        color: '#323643',
        textAlign: 'center',
        fontFamily: 'Cairo-Bold'
    },
    image_style: {
        width: 170,
        height: 170,
        marginVertical: 5,
    },
    slider: {
        overflow: 'visible' // for custom animations
    },
    sliderContentContainer: {
        paddingVertical: 10 // for custom animation
    },
    exampleContainer: {
        paddingVertical: 30
    },
    title: {
        textAlign: 'left',
        fontSize: 18,
        fontWeight: 'normal',
        color: '#535376',
        flex: 1,
        fontFamily: 'Cairo-Regular'
    },
    userType: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 16,
        color: "#323643",
        fontFamily: 'Cairo-Bold'
    },
    contentContainer: {
        width: '95%',
        flexDirection: 'row',
        height: 100,
        backgroundColor: "#FCFDFF",
        shadowOffset: {height: 0, width: 0},
        shadowColor: colors.shadow,
        shadowOpacity: 1,
        shadowRadius: 5,
        paddingTop: 10,
        alignItems: 'center',
        margin: 10
    },
    data: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 30,
        width: '20%',
        color: "#30b667",
        fontFamily: 'Cairo-Regular'
    },
    sliderContainer: {
        paddingTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 5,
        paddingLeft: 5
    },
    noData: {
        padding: 50,
        fontSize: 24,
        fontFamily: 'Cairo-Bold'
    },
    subTitle: {
        fontSize: 15,
        color: '#8F8F8F',
        textAlign: 'right'
    },
    imageStyle: {
        width: 320,
        height: 100,
        paddingBottom: 5,
        alignSelf: 'center',
    },
    brand: {
        color: '#656589',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 10,
        marginLeft: 5,
        fontFamily: 'Cairo-Regular'
    },
    price: {
        color: '#656589',
        fontSize: 10,
        textAlign: 'center',
        //marginTop: 25,
        marginLeft: 5,
        fontFamily: 'Cairo-Regular',
        textDecorationLine: 'line-through'

    },
    discount: {
        color: 'red',
        fontSize: 10,
        textAlign: 'center',
        //marginRight :60,
        marginLeft: 5,
        fontFamily: 'Cairo-Regular'
    },
    listContainer: {
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 10,
        marginBottom: 70,
    },
});

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        currentUser: state.user.user,
        physicalTrainings: state.physicalTraining.physicalTrainings
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetPhysicalTraining: ()=>dispatch(getPhysicalTrainings())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);