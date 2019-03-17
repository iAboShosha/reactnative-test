import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from "react-native";
import {connect} from "react-redux";

class Card extends React.Component {
    render() {
        console.log('this.props.data ==> ', this.props.data)
        return (
            <TouchableOpacity onPress={this.props.openPhysicalTrainingItem} style={styles.container}>
                <Image
                    resizeMode={'contain'}
                    style={styles.imageStyle}
                    source={{uri: this.props.data.urls.full}}
                />
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.brand}> {this.props.data.user.name}  </Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.price}> $ {this.props.data.user.twitter_username}  </Text>
                        <Text style={styles.discount}> $ {this.props.data.user.instagram_username}  </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )

    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: '100%',
        marginBottom: 5,
        //marginHorizontal: 5,
        paddingHorizontal: 12,
        justifyContent: 'space-between',
        borderRadius: 10,
        padding: 5,
        margin: 5,
        // borderColor :'gray',
        // borderStyle:'solid',
        // borderWidth:0.4
    },
    card: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    imageStyle: {
        width: 125,
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
        fontSize: 12,
        textAlign: 'center',
        marginTop: -2,
        marginLeft: 5,
        fontFamily: 'Cairo-Regular'
    }
});

const mapStateToProps = state => {
    return {
        currentUser: state.user.user,
    };
};
const mapDispatchToProps = () => {
    return {
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Card);