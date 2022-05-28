import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL,
    FACEBOOK_AUTH_SUCCESS,
    FACEBOOK_AUTH_FAIL,
    LOGOUT,
    FETCHUSERLIST_SUCCESS,
    FETCHUSERLIST_FAIL,
    ONCLICKUSERLIST_SUCCESS,
    ONCLICKUSERLIST_FAIL,
    GETMESSAGEID_SUCCESS,
    GETMESSAGEID_FAIL
} from '../actions/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    access: AsyncStorage.getItem('access'),
    refresh: AsyncStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
    userList: null,
    currentMessages: null,
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGIN_SUCCESS:
        case GOOGLE_AUTH_SUCCESS:
        case FACEBOOK_AUTH_SUCCESS:
            AsyncStorage.setItem('access', payload.access);
            AsyncStorage.setItem('refresh', payload.refresh);
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload
            }
        case FETCHUSERLIST_SUCCESS:
            return {
                ...state,
                userList: payload
            }
        case ONCLICKUSERLIST_SUCCESS:
            return {
                ...state,
                currentMessages: payload,
                lastDate: ""
            }
        case GETMESSAGEID_SUCCESS:
            currentMessages.append(payload)
            return {
                ...state,
            }
        case ONCLICKUSERLIST_SUCCESS:
            return {
                ...state,
                currentMessages: payload,
                lastDate: ""
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null
            }
        case GOOGLE_AUTH_FAIL:
        case FACEBOOK_AUTH_FAIL:
        case LOGIN_FAIL:
        case SIGNUP_FAIL:
        case LOGOUT:
            AsyncStorage.removeItem('access');
            AsyncStorage.removeItem('refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null
            }
        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_CONFIRM_FAIL:
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
        case FETCHUSERLIST_FAIL:
        case ONCLICKUSERLIST_FAIL:
        case GETMESSAGEID_FAIL:
            return {
                ...state
            }
        default:
            return state
    }
};
