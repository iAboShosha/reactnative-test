import {INCREMENT_PAGE_PHYSICAL, RESET_PAGE_PHYSICAL, PAGE_CHANGED_PHYSICAL, PHYSICAL_LIMIT_LIST} from "../actions/actionTypes";

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
        case INCREMENT_PAGE_PHYSICAL:
            return {
                ...state,
                page: state.page + 1
            };
        case RESET_PAGE_PHYSICAL:
            return {
                ...state,
                page: 0
            };
        case PAGE_CHANGED_PHYSICAL :
            return {
                ...state,
                isPageChanged: action.isPageChanged
            };
        default:
            return state;
    }
}

export default reducer;
