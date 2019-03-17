import {UI_START_LOADING, UI_STOP_LOADING, UI_SELECTED_NAV} from "../actions/actionTypes";

const initialState = {
    isLoading: false,
    selectedCategory: 'home',
    selectedNav: 'Home'
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UI_START_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case UI_STOP_LOADING:
            return {
                ...state,
                isLoading: false
            };
        case UI_SELECTED_NAV:
            return {
                ...state,
                selectedNav: action.nav
            };
        default:
            return state;
    }
};

export default reducer;