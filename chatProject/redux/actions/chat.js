import axios from 'axios';
import {REACT_APP_API_URL} from "@env"
import {
    FETCHUSERLIST_SUCCESS,
    FETCHUSERLIST_FAIL,
    ONCLICKUSERLIST_SUCCESS,
    ONCLICKUSERLIST_FAIL,
    GETMESSAGEID_SUCCESS,
    GETMESSAGEID_FAIL
} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchUserList = () => async dispatch => {
    if (AsyncStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${await AsyncStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`${REACT_APP_API_URL}/api/v1/user/`, config);

            dispatch({
                type: FETCHUSERLIST_SUCCESS,
                payload: res.data
            });

            dispatch(drawUserList());
        } catch (err) {
            dispatch({
                type: FETCHUSERLIST_FAIL
            })
        }
    } else {
        dispatch({
            type: FETCHUSERLIST_FAIL
        });
    }

}

export const onClickUserList = (recipient) => async dispatch => {
    if (AsyncStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${await AsyncStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`${REACT_APP_API_URL}/api/v1/message/user_messages/?target=${recipient}`, config);
            
            dispatch({
                type: ONCLICKUSERLIST_SUCCESS,
                payload: res.data
            });

        } catch (err) {
            dispatch({
                type: ONCLICKUSERLIST_FAIL
            })
        }
    } else {
        dispatch({
            type: ONCLICKUSERLIST_FAIL
        });
    }

}

export const getMessageById = (message) => async dispatch => {
    if (AsyncStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${await AsyncStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        const msg_id = JSON.parse(message).message;
        try {
            const res = await axios.get(`${REACT_APP_API_URL}/api/v1/message/${msg_id}/`, config);
            dispatch({
                type: GETMESSAGEID_SUCCESS,
                payload: res.data
            });

        } catch (err) {
            dispatch({
                type: GETMESSAGEID_FAIL
            })
        }
    } else {
        dispatch({
            type: GETMESSAGEID_FAIL
        });
    }

}
