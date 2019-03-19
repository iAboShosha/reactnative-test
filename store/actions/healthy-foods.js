import {authGetToken, authLogout, uiStartLoading, uiStopLoading} from "./index";
import {FOODS_LIMIT_LIST, INCREMENT_PAGE, PAGE_CHANGED, RESET_PAGE} from "./actionTypes";

export const getHealthyFoods = () => {
    return (dispatch, getState) => {
        dispatch(uiStartLoading());
        dispatch(authGetToken());
        return fetch(
            'https://api.unsplash.com/photos/?client_id=7320320b1576fafcbc37b052a76efb5da6eae1c98eacf271cbfd51236bd5c46d&page=' +
            getState().healthyFoods.page + '&per_page=10', {
                method: 'get',
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }),

            })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(uiStopLoading());
                if (parsedRes.error) {
                    if (parsedRes.error.statusCode === 401) {
                        dispatch(authLogout());
                    } else {
                        if (parsedRes.error.message === 'Network request failed') {
                            alert(__.t('internet error'))
                        }
                    }
                } else {
                    dispatch(updateHealthyFoodsList(parsedRes));
                    dispatch(incrementPage());
                    dispatch(pageChanged(true));
                }
            })
            .catch(err => {
                dispatch(uiStopLoading());
                if (err.message === 'Network request failed') {
                    alert(__.t('internet error'))
                }
                console.log(err.toString());
            });

    };
};

export const updateHealthyFoodsList = foods => {
    return {
        type: FOODS_LIMIT_LIST,
        foods
    }
};

export const pageChanged = (isChanged) => {
    return {
        type: PAGE_CHANGED,
        isPageChanged: isChanged
    }
};
export const incrementPage = () => {
    return {
        type: INCREMENT_PAGE,
    }
};
export const resetPage = () => {
    return {
        type: RESET_PAGE
    }
};