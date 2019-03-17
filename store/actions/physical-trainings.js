import {authGetToken, authLogout, uiStartLoading, uiStopLoading} from "./index";
import {
    PHYSICAL_LIMIT_LIST,
    INCREMENT_PAGE,
    PAGE_CHANGED,
    RESET_PAGE,
    PAGE_CHANGED_PHYSICAL,
    INCREMENT_PAGE_PHYSICAL, RESET_PAGE_PHYSICAL
} from "./actionTypes";

export const getPhysicalTrainings = () => {
    return (dispatch, getState) => {
        dispatch(uiStartLoading());
        dispatch(authGetToken());
        return fetch(
            'https://api.unsplash.com/photos/?client_id=7320320b1576fafcbc37b052a76efb5da6eae1c98eacf271cbfd51236bd5c46d&page='+
            getState().healthyFoods.page+'&per_page=10', {
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
                            alert('حدث خطأ بالإتصال بالإنترنت')
                        }
                    }
                } else {
                    dispatch(updatePhysicalTrainingsList(parsedRes));
                    dispatch(incrementPage());
                    dispatch(pageChanged(true));
                }
            })
            .catch(err => {
                dispatch(uiStopLoading());
                if (err.message === 'Network request failed') {
                    alert('حدث خطأ بالإتصال بالإنترنت')
                }
                console.log(err.toString());
            });

    };
};

export const updatePhysicalTrainingsList = physicalTrainings => {
    return {
        type: PHYSICAL_LIMIT_LIST,
        physicalTrainings
    }
};

export const pageChanged =(isChanged) =>{
    return {
        type: PAGE_CHANGED_PHYSICAL,
        isPageChanged : isChanged
    }
};
export const incrementPage = () => {
    return {
        type: INCREMENT_PAGE_PHYSICAL,
    }
};
export const resetPage = () =>{
    return {
        type: RESET_PAGE_PHYSICAL
    }
};