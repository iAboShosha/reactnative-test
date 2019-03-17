import {FOODS_LIMIT_LIST, INCREMENT_PAGE, RESET_PAGE, PAGE_CHANGED} from "../actions/actionTypes";

const initialState = {
    foods: [],
    page: 0,
    isPageChanged: true,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case FOODS_LIMIT_LIST:
            console.log('state.pagestate.pagestate.page ==> ', state.page)
            if (state.page !== 0) {
                action.foods.forEach((item) => {
                    state.foods.push(item)
                });
            }
            return {
                ...state,
                foods: state.page === 0 ? action.foods : state.foods
            };
        case INCREMENT_PAGE:
            return {
                ...state,
                page: state.page + 1
            };
        case RESET_PAGE:
            return {
                ...state,
                page: 0
            };
        case PAGE_CHANGED :
            return {
                ...state,
                isPageChanged: action.isPageChanged
            };
        default:
            return state;
    }
}

export default reducer;
