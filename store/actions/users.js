import {
    USER_SAVE,
    USER_UPDATE,
    SAVE_NEW_PASSWORD
} from "./actionTypes";
import {authGetToken, uiStartLoading, uiStopLoading, authLogout} from "./index";
import {saveLanguage} from "./lock-ups";

export const getUser = (id) => {
    return (dispatch, getState) => {
        return dispatch(authGetToken())
            .then(token => {
                return new Promise((resolve, reject) => {
                    if (token) {
                        if (!getState().user.user.id) {
                            resolve({
                                id: id,
                                name: 'Name for Test',
                                email: 'user@physicalTraining.com',
                                avatar: 'https://s3-eu-west-1.amazonaws.com/fittingroom/1_objects_25.png',
                                languageId: 'ar',
                            })
                        } else {
                            resolve(getState().user.user)
                        }
                    } else {
                        reject()
                    }
                })
            })
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
                    dispatch(setUser(parsedRes));
                    return parsedRes;
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

export const changePassword = (authData) => {
    return (dispatch, getState) => {
        dispatch(uiStartLoading());
        return dispatch(authGetToken())
            .then(token => {
                if (token) {
                    if (getState().auth.credential.password === authData.password) {
                        dispatch({type: SAVE_NEW_PASSWORD, password: authData.newPassword})
                    } else {
                        alert('كلمة السر غير صحيحة')
                    }
                } else {
                    alert('حدث خطأ بالإتصال بالإنترنت')
                }
            });
    };
};
export const updateUser = user => {
    return dispatch => {
        dispatch(uiStartLoading());
        return dispatch(authGetToken())
            .then(token => {
                dispatch(uiStopLoading());
                if (token) {
                    dispatch(updateCurrentUser(user));
                    dispatch(saveLanguage(user.languageId))
                } else {
                    alert('حدث خطأ بالإتصال بالإنترنت')
                }
            })
            .catch(err => {
                dispatch(uiStopLoading());
                if (err.message === 'Network request failed') {
                    alert('حدث خطأ بالإتصال بالإنترنت')
                }
                console.log(err.toString());
            });
    }
};

export const setUser = user => {
    return {
        type: USER_SAVE,
        user: user
    };
};

export const updateCurrentUser = user => {
    return {
        type: USER_UPDATE,
        user: user
    };
};