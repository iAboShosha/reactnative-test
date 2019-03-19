import {AsyncStorage} from "react-native";

import {
    AUTH_SET_TOKEN,
    AUTH_REMOVE_TOKEN,
    USER_LOGGED_IN,
    USER_LOGGED_OUT,
} from "./actionTypes";
import {uiStartLoading, uiStopLoading, getUser} from "./index";

export const authSignIn = (authData) => {
    return (dispatch, getState) => {
        dispatch(uiStartLoading());
        return new Promise((resolve, reject) => {
            if (authData.email === getState().auth.credential.email &&
                authData.password === getState().auth.credential.password) {
                dispatch(uiStopLoading());
                const token = {
                    id: 'tYuoH0ri48Z9NIu2LZaGx6ia3BSlP9swoC5J3798mfZDKKLA371x8yfC7QU38WPH',
                    ttl: 1209600,
                    userId: '5af0902724589e0dd88e901c',
                };
                dispatch(
                    authStoreToken(
                        token.id,
                        token.ttl,
                        token.userId
                    )
                );
                dispatch(getUser(
                    token.userId
                )).then(() => {
                    // dispatch(allCasesList([]));
                    dispatch(setHomePage());
                    resolve()
                })
            } else {
                alert(__.t("email or password is invalid"));
                dispatch(uiStopLoading());
                reject()
            }
        })
    };
};

export const authStoreToken = (token, ttl, userId) => {
    return dispatch => {
        const now = new Date();
        const expiryDate = now.getTime() + ttl * 1000;
        dispatch(authSetToken(token, expiryDate, userId));
        AsyncStorage.setItem("ap:auth:token", token);
        AsyncStorage.setItem("ap:auth:expiryDate", expiryDate.toString());
        AsyncStorage.setItem("ap:auth:userId", userId);
    };
};

export const authSetToken = (token, expiryDate, userId) => {
    return {
        type: AUTH_SET_TOKEN,
        token: token,
        expiryDate: expiryDate,
        userId: userId
    };
};

export const authGetToken = () => {
    return (dispatch, getState) => {

        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token;
            const expiryDate = getState().auth.expiryDate;
            if (!token || new Date(expiryDate) <= new Date()) {
                let fetchedToken;
                AsyncStorage.getItem("ap:auth:token")
                    .catch(err => reject())
                    .then(tokenFromStorage => {
                        fetchedToken = tokenFromStorage;
                        if (!tokenFromStorage) {
                            reject();
                            return;
                        }
                        return AsyncStorage.getItem("ap:auth:expiryDate");
                    })
                    .then(expiryDate => {
                        const parsedExpiryDate = new Date(parseInt(expiryDate));
                        const now = new Date();
                        if (parsedExpiryDate > now) {
                            return AsyncStorage.getItem("ap:auth:userId")
                                .then(userId => {
                                    dispatch(authSetToken(fetchedToken, expiryDate, userId));
                                    resolve(fetchedToken);
                                })
                        } else {
                            reject();
                        }
                    })
                    .catch(err => reject());
            } else {
                resolve(token);
            }
        });

        return promise;
    };
};


export const authAutoSignIn = () => {
    return (dispatch, getState) => {
        dispatch(authGetToken())
            .then(() => {
                if (getState().auth.userId) {
                    dispatch(getUser(
                        getState().auth.userId
                    )).then((res) => {

                        dispatch(setHomePage());

                    })

                }
            })
            .catch(err => console.log("Failed to fetch token!"));
    };
};

export const authClearStorage = () => {
    return () => {
        AsyncStorage.removeItem("ap:auth:token");
        AsyncStorage.removeItem("ap:auth:expiryDate");
        return AsyncStorage.removeItem("ap:auth:userId");
    };
};

export const authLogout = () => {
    return dispatch => {
        dispatch(authClearStorage()).then(() => {
            //dispatch(resetUser());
            dispatch(setLoggedOut());
        });
        dispatch(authRemoveToken());
    };
};

export const authRemoveToken = () => {
    return {
        type: AUTH_REMOVE_TOKEN
    };
};

export const setHomePage = () => {
    return {
        type: USER_LOGGED_IN
    };
};


export const setLoggedOut = () => {
    return {
        type: USER_LOGGED_OUT
    };
};

