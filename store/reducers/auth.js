import {AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN, SAVE_NEW_PASSWORD} from "../actions/actionTypes";

const initialState = {
    token: null,
    expiryDate: null,
    userId: null,
    credential: {
        email: 'user@physicalTraining.com',
        password: '123456'
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_SET_TOKEN:
            return {
                ...state,
                token: action.token,
                expiryDate: action.expiryDate,
                userId: action.userId
            };
        case AUTH_REMOVE_TOKEN:
            return {
                ...state,
                token: null,
                expiryDate: null,
                userId: null
            };
        case SAVE_NEW_PASSWORD:
            return {
                ...state,
                credential: {
                    ...state.credential,
                    password: action.password
                }
            };
        default:
            return state;
    }
};

export default reducer;
