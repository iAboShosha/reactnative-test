import {authGetToken, authLogout, uiStopLoading} from "./index";
import {
    LANGUAGES,
    SET_LANGUAGE
} from "./actionTypes";
import {AsyncStorage} from "react-native";

export const getLanguages = () => {
    return (dispatch) => {
        dispatch(authGetToken())
            .catch(() => {
                dispatch(authLogout());
                dispatch(uiStopLoading());
            })
            .then(token => {
                return new Promise((resolve, reject) => {
                    if (token) {
                        resolve([
                            {
                                "name": "Arabic",
                                "code": "ar"
                            },
                            {
                                "name": "English",
                                "code": "en"
                            }
                        ])
                    } else {
                        reject()
                    }
                })
            })
            .then(parsedRes => {
                let languages = [];
                parsedRes.forEach(lang => {
                    languages.push({
                        label: lang.name,
                        value: lang.code,
                        obj: lang
                    })
                });
                if (parsedRes.error) {
                    if (parsedRes.error.statusCode === 401) {
                        dispatch(authLogout());
                    } else {
                        if (parsedRes.error.message === 'Network request failed') {
                            alert('حدث خطأ بالإتصال بالإنترنت')
                        }
                    }
                } else {
                    dispatch(getAllLanguages(languages));
                }
            })
            .catch(err => {
                if (err.message === 'Network request failed') {
                    alert('حدث خطأ بالإتصال بالإنترنت')
                }
                console.log(err.toString());
            });

    };
};

export const saveLanguage = (language) => {
    return (dispatch) => {
        AsyncStorage.setItem("ap:language", language);
        dispatch(setCurrentLanguage(language));
    }
};

export const loadDefaultLanguage = () => {
    return (dispatch) => {
        return AsyncStorage.getItem("ap:language").then((language) => {
            dispatch(setCurrentLanguage(language));
        });
    }
};

export const getAllLanguages = languages => {
    return {
        type: LANGUAGES,
        languages: languages
    }
};

export const setCurrentLanguage = language => {
    return {
        type: SET_LANGUAGE,
        language: language
    }
};