import React from 'react';
import {View} from "react-native";
import {Svg, Path} from 'react-native-svg';
import {createStackNavigator, createBottomTabNavigator} from "react-navigation";

import {colors} from "../config";
import {
    HomeScreen,
    GymsScreen,
    PhysicalTrainingScreen,
    HealthyFoodsScreen,
    SettingsScreen
} from '../screens';

import {isIphoneX} from "../utility";


const navigationOptions = {
    headerTitleStyle: {
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        color: '#323643',
        fontFamily: 'Cairo-Regular'
    },
    headerStyle: {
        backgroundColor: '#fff',
        marginTop: isIphoneX() ? 27 : 0,
        borderWidth: 0,
        shadowOpacity: 0,
        shadowColor: '#FFF',
        shadowOffset: {
            height: 0,
        },
        shadowRadius: 0,
        elevation: 0
    }
};

const HealthyFoodsTab = createStackNavigator({
    HealthyFoods: HealthyFoodsScreen
}, {
    initialRouteName: "HealthyFoods",
    navigationOptions: navigationOptions
});
const GymsTab = createStackNavigator({
    Gyms: GymsScreen
}, {
    initialRouteName: "Gyms",
    navigationOptions: navigationOptions
});

const ProfileTab = createStackNavigator({
    Settings: SettingsScreen
}, {
    initialRouteName: "Settings",
    navigationOptions: navigationOptions
});

const HomeTab = createStackNavigator({
        Home: HomeScreen,
        PhysicalTraining: PhysicalTrainingScreen
    },
    {
        initialRouteName: "Home",
        navigationOptions: navigationOptions
    });


export const tabNavigator = createBottomTabNavigator(
    {
        HomeTab: {
            screen: HomeTab,
            navigationOptions: () => ({
                tabBarIcon: ({}) => (
                    <View style={{paddingTop: 10, paddingLeft: 5}}>
                        <Svg width="21" height="39" viewBox="0 0 21 39">
                            <Path
                                d="M0,37.4086007 L0,0 L21.0748006,0.0627028892 L2.87795189,2.4914708 L2.87795189,39 L0,37.4086007 Z M5.28190712,19.1319055 L10.7141426,18.3667023 L10.7141426,19.7624116 L5.28190712,21.0877797 L5.28190712,19.1319055 Z"
                                //fill={colors.primary}
                                scale="0.8"
                            />
                        </Svg>
                    </View>
                )
            })
        },
        GymsTab: {
            screen: GymsTab,
            navigationOptions: () => ({
                tabBarIcon: ({}) => (
                    <View style={{paddingTop: 14}}>
                        <Svg width="38" height="38" viewBox="0 0 38 38">
                            <Path
                                d="M32.5820798,5.39 C32.5820798,7.04685425 31.3136021,8.39 29.7488555,8.39 C28.1841089,8.39 26.9156311,7.04685425 26.9156311,5.39 L26.9156311,3.61 C26.9156311,1.95314575 28.1841089,0.61 29.7488555,0.61 C31.3136021,0.61 32.5820798,1.95314575 32.5820798,3.61 L32.5820798,5.39 Z M22.1935906,6 C20.8896351,6 19.8325703,4.88071187 19.8325703,3.5 C19.8325703,2.11928813 20.8896351,1 22.1935906,1 C23.4975461,1 24.5546109,2.11928813 24.5546109,3.5 C24.5546109,4.88071187 23.4975461,6 22.1935906,6 Z M24.5546109,11.64 L21.2397384,16.5 L16.6121387,16.5 C16.3350721,16.5033223 16.0706057,16.3776401 15.8887889,16.1562428 C15.706972,15.9348456 15.6261501,15.6400723 15.6677305,15.35 C16.1873761,12.532437 18.5190997,10.4994069 21.2302943,10.5 C22.4241475,10.4997007 23.5875898,10.8986772 24.5546109,11.64 Z M29.7488555,11.0000002 C33.7410307,10.9991328 37.1271618,14.1047148 37.6960467,18.2887474 C37.7369927,18.5952768 37.6496427,18.9054715 37.4568427,19.1382014 C37.2640427,19.3709313 36.9849695,19.503048 36.6926135,19.499997 L22.8050975,19.499997 C22.5127414,19.503048 22.2336682,19.3709313 22.0408682,19.1382014 C21.8480682,18.9054715 21.7607182,18.5952768 21.8016642,18.2887474 C22.3705491,14.1047148 25.7566803,10.9991328 29.7488555,11.0000002 Z"
                                fill={colors.background}
                                stroke={colors.primary_font}
                                scale="1"
                            />
                        </Svg>

                    </View>
                )
            })
        },
        HealthyFoodsTab: {
            screen: HealthyFoodsTab,
            navigationOptions: () => ({
                tabBarIcon: ({}) => (
                    <View style={{paddingTop: 14}}>
                        <Svg width="38" height="38" viewBox="0 0 38 38">
                            <Path
                                d="M38.6140781,15.007926 L45.8542149,22.6394012 C46.0356975,22.8306931 46.0415049,23.1472114 45.8671861,23.3463647 C45.6928673,23.5455179 45.4044333,23.5518908 45.2229508,23.3605988 L37.9747263,15.7205988 C37.9685719,15.7141118 37.9626196,15.7074807 37.9568694,15.7007151 C36.4452911,17.1303561 34.4472439,18 32.2564962,18 C27.5408215,18 23.7180119,13.9705627 23.7180119,9 C23.7180119,4.02943725 27.5408215,0 32.2564962,0 C36.9721708,0 40.7949805,4.02943725 40.7949805,9 C40.7949805,11.3088901 39.9701246,13.4147114 38.6140781,15.007926 Z"
                                fill={colors.background}
                                stroke={colors.primary_font}
                                scale="0.8"
                            />
                        </Svg>

                    </View>
                )
            })
        },
        ProfileTab: {
            screen: ProfileTab,
            navigationOptions: () => ({
                tabBarIcon: ({}) => (
                    <View style={{paddingTop: 14}}>
                        <Svg width="38" height="38" viewBox="0 0 38 38">
                            <Path x={8}
                                  d="M29.2644213,5.57625062 C29.2687445,6.70254084 28.8238351,7.77856735 28.0389951,8.53998038 C27.254155,9.30139341 26.2021215,9.67762686 25.1413499,9.57625062 C23.1474063,9.3201248 21.6602375,7.50987483 21.6991528,5.38625062 L21.6991528,4.20625062 C21.6602375,2.08262641 23.1474063,0.272376449 25.1413499,0.0162506239 C26.2021215,-0.0851256088 27.254155,0.291107834 28.0389951,1.05252087 C28.8238351,1.8139339 29.2687445,2.88996041 29.2644213,4.01625062 L29.2644213,5.57625062 Z M27.46767,13.2762506 C27.9929084,12.6046072 28.8689754,12.3699708 29.6332281,12.6962506 C33.086879,14.2886709 35.4562864,17.7314297 35.8272918,21.6962506 C35.8569877,21.9799467 35.7706269,22.263541 35.5899614,22.4756035 C35.4092959,22.687666 35.1515463,22.8079833 34.8816332,22.8062506 L16.0819409,22.8062506 C15.8120277,22.8079833 15.5542781,22.687666 15.3736126,22.4756035 C15.1929471,22.263541 15.1065863,21.9799467 15.1362823,21.6962506 C15.5072876,17.7314297 17.8766951,14.2886709 21.3303459,12.6962506 C22.0945987,12.3699708 22.9706656,12.6046072 23.495904,13.2762506 L24.7536299,14.8662506 C24.9332861,15.0955209 25.2002137,15.2282067 25.481787,15.2282067 C25.7633603,15.2282067 26.030288,15.0955209 26.2099441,14.8662506 L27.46767,13.2762506 Z"
                                  fill={colors.background}
                                  stroke={colors.primary_font}
                                  scale="0.8"
                            />
                        </Svg>
                    </View>
                )
            })
        },

    },
    {
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: false,
        initialRouteName: "HomeTab",
        tabBarOptions: {
            activeTintColor: "mediumorchid",
            inactiveTintColor: "#d1cece",
            showLabel: false,
            showIcon: true,
            tabStyle: {justifyContent: "space-around", alignContent: "center", backgroundColor: '#fff'}
        }
    }
);


