import {
     USER_IS_LOGGED_IN,
     USER_SAVE,
     USER_GET,
     USER_UPDATE,
     All_USERS,
     USER_RESET,
     GET_ALL_VOLUNTEERS,
     GET_USER_SUMMARY,
     GET_SUGGESTION_USERS,
     GET_ACCOUNT_SUGGESTIONS,
     INCREASE_FOLLOWINGS_COUNT,
     DECREASE_FOLLOWINGS_COUNT
    } from "../actions/actionTypes";



const initialState = {
    user: {
        id: null,
        name: null,
        address: null,
        mobile: null,
        email: null,
        date: null,
        avatar: null,
        type:null,
        gender :null,
        cityId :null,
        languageId:null,
        countryId:null,
        bio:null,
        followingsCount:0,
        followersCount:0
    },
    allUsers:[],
    volunteers:[],
    summary:{},
    suggestionUsers:[],
    suggestions:[]
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case USER_IS_LOGGED_IN:
            return !!initialState.user.id;
        case USER_SAVE:
            return {
                ...state,
                user: {
                    id: action.user.id,
                    name: action.user.name,
                    mobile: action.user.mobile,
                    address: action.user.address,
                    email: action.user.email,
                    type: action.user.type,
                    avatar: action.user.avatar,
                    notificationDevices: action.user.notificationDevices,
                    bio : action.user.bio,
                    gender: action.user.gender,
                    cityId: action.user.cityId,
                    languageId: action.user.languageId,
                    countryId: action.user.countryId,
                    followingsCount:action.user.followingsCount,
                    followersCount: action.user.followersCount
                }
            };

        case USER_UPDATE:
            return {
                ...state,
                user: {
                    ...state.user,
                    name: action.user.name,
                    mobile: action.user.mobile,
                    address: action.user.address,
                    email: action.user.email,
                    type: action.user.type,
                    avatar: action.user.avatar,
                    gender: action.user.gender,
                    cityId: action.user.cityId,
                    languageId: action.user.languageId,
                    countryId: action.user.countryId,
                    bio: action.user.bio
                }
            };

        case USER_GET:
            return state;
        case INCREASE_FOLLOWINGS_COUNT:
            return {
                ...state,
                user: {
                    ...state.user,
                followingsCount: state.user.followingsCount +1
                }
            };
        case DECREASE_FOLLOWINGS_COUNT:
            return {
                ...state,
                user: {
                    ...state.user,
                followingsCount: state.user.followingsCount -1
                }
            };
        case All_USERS:
            return{
                ...state,
                allUsers: action.users
            };
        case GET_USER_SUMMARY:
            return {
                ...state,
                summary: action.summary
            };
        case USER_RESET :
            return {
                user: {
                    id: null,
                    name: null,
                    address: null,
                    mobile: null,
                    email: null,
                    date: null,
                    avatar: null,
                    type:null,
                    cityId: null,
                    languageId: null,
                    countryId: null,
                    bio:null,
                    followingsCount:0,
                    followersCount: 0
                }
            };
        case GET_SUGGESTION_USERS :
            return {
                ...state,
                suggestionUsers: action.suggestionUsers
                };
        case GET_ACCOUNT_SUGGESTIONS:
            return {
                ...state,
                suggestions: action.suggestions
            }
        default:
            return state;
    }
}

export default reducer;