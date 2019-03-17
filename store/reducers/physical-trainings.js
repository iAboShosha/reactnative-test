import {FOODS_LIMIT_LIST, INCREMENT_PAGE, RESET_PAGE, PAGE_CHANGED, PHYSICAL_LIMIT_LIST} from "../actions/actionTypes";

const initialState = {
    physicalTrainings: [],
    page: 0,
    isPageChanged: true,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case PHYSICAL_LIMIT_LIST:
            if (state.page !== 0) {
                action.physicalTrainings.forEach((item) => {
                    state.physicalTrainings.push(item)
                });
            }
            return {
                ...state,
                physicalTrainings: state.page === 0 ? action.physicalTrainings : state.physicalTrainings
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
