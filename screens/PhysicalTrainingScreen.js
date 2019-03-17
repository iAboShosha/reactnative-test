import React from 'react';
import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    authLogout,
} from "../store/actions";
import {Entypo} from "@expo/vector-icons";
import {connect} from "react-redux";
import {cloneDeep} from 'lodash'
import {font} from "../config";

class PhysicalTrainingScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: navigation.state.params.physicalTraining.name,
        headerLeft: <TouchableOpacity onPress={() => {
            navigation.goBack(null)
        }}>
            <Entypo name="chevron-thin-left" style={{paddingLeft: 10}} size={32} color='#000'/></TouchableOpacity>,
        headerRight: <View style={{flexDirection: 'row'}}>
            <NotificationBell navigation={navigation}/>
        </View>,
        headerTitleStyle: {width: '100%', textAlign: 'center', alignSelf: 'center', fontWeight: 'normal'}
    });

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            isModalVisible: false,
            isModalCommentsVisible: false,
            quantity: 1,
            sizes: [],
            colors: [],
            size: this.props.navigation.state.params.physicalTraining.sizes[0].size,
            product: this.props.navigation.state.params.physicalTraining,
            color: this.props.navigation.state.params.physicalTraining.color,
            likes: this.props.likes ? this.props.likes : 0
        };
    }

    render() {

        return (
            <ScrollView style={styles.container}>

            </ScrollView>
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
    imageStyle: {
        height: 200,
        width: '95%'
    },
    likesContainer: {
        flexDirection: 'row',
        //justifyContent :'center',
        height: 35,
        margin: 8,
        width: '95%',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgba(207,206,204,0.5)'
    },
    username: {
        fontSize: 13,
        textAlign: 'left',
        marginHorizontal: 5,
        marginVertical: 3,
        color: '#5E5E5E'
    },
    label: {
        textAlign: 'left',
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 13,
        color: '#5E5E5E'
    },
    btnAdd: {
        padding: 5,
        borderRadius: 20,
        backgroundColor: "#000",
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 8,
        marginBottom: 2,
        width: "60%",
        alignSelf: 'center'
    },
    textAdd: {
        flex: 0.8,
        fontSize: 14,
        marginHorizontal: 2,
        textAlign: 'center',
        color: '#fff',
        width: "70%",
    },
    iconStyle: {
        width: 22,
        height: 22
    },
    sliderContainer: {
        paddingTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 5,
        paddingLeft: 5
    },
    listContainer: {
        alignSelf: 'center',
        padding: 10
    },
    sliderContentContainer: {
        paddingVertical: 10 // for custom animation
    },
    subTitle: {
        textAlign: 'left',
        fontSize: 18,
        color: '#535376'
    },
    imageContainer: {
        borderRadius: 55,
        width: 40,
        height: 40,
        alignItems: 'flex-start',
        marginLeft: 5,
        //flex: 1
    },
    btnFollow: {
        flexDirection: 'row',
        marginTop: 8,
        marginBottom: 5,
        marginLeft: 170,
        alignSelf: 'flex-end'
    },
    modal: {
        backgroundColor: "#FFF",
        marginTop: 280,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        paddingBottom: 15,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        width: '26%',
        marginLeft: 6,
        borderWidth: 0.5,
        borderColor: '#E4DECF',
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 15,
        backgroundColor: '#fff',
        borderBottomLeftRadius: 15,
    },
    leftBtn: {
        width: 25,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 16,
        marginTop: -3,
        textAlign: 'center',
        color: 'gray'
    },
    rightBtn: {
        width: 25,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    quantity: {
        width: 25,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    discount: {
        color: 'red',
        fontSize: 14,
        textAlign: 'left',
        //marginRight :60,
        marginLeft: 5,
        marginTop: 12,
        alignItems: 'flex-start'
    },
    dropDown: {
        justifyContent: 'space-between',
        width: 85,
        color: '#FFF',
        fontSize: 14,
        textAlign: 'center',
        paddingLeft: 10,
        marginLeft: 10
    },
    colordropDown: {
        justifyContent: 'space-between',
        width: 100,
        color: '#000',
        fontSize: 14,
        textAlign: 'center',
        marginLeft: 6
    },
    dropdownContainer: {
        borderColor: "#000",
        justifyContent: 'center',
        backgroundColor: '#000',
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 15,
        width: '30%',
        height: 30,
        paddingHorizontal: 8
    },
    colorContainer: {
        borderColor: "#E4DECF",
        justifyContent: 'center',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 15,
        width: '28%',
        height: 30,
        marginRight: 6,
        paddingHorizontal: 8
    },
    dropDowncontainerStyle: {
        width: 200
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
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
        textAlign: 'left',
        fontFamily: font.fontFamily
    },
    modalHeader: {
        marginHorizontal: 15,
        marginVertical: 13,
        fontWeight: 'bold'
    },
    commentText: {
        marginHorizontal: 3,
        marginVertical: 5,
    },
    sendBtn: {
        marginLeft: 15
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
        onAuthLogout: () => dispatch(authLogout()),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(PhysicalTrainingScreen);