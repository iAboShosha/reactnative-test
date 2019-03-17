import {UI_SELECTED_NAV, UI_START_LOADING, UI_STOP_LOADING} from './actionTypes';

export const uiStartLoading = () => {
    return {
        type: UI_START_LOADING
    };
};

export const uiStopLoading = () => {
    return {
        type: UI_STOP_LOADING
    };
};

export const uiSelectedNav = (nav) => {
    return {
        type: UI_SELECTED_NAV,
        nav: nav
    };
};