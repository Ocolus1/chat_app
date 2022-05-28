import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {REACT_APP_API_URL} from "@env"


export function getTime(dateString) {
    if (!dateString) return ''
    let date = new Date(dateString);
    let dualize = (x) => x < 10 ? "0" + x : x;
    return dualize(date.getHours()) + ":" + dualize(date.getMinutes());
}
// terrianae31@mufollowsa.com
export function showDateUserlist(dateString) {
    let weekdaydate = showDatesWeekDays(dateString);
    if (weekdaydate === 'TODAY')
        return getTime(dateString)
    return weekdaydate
}

export function showDatesWeekDays(dateString) {
    if (!dateString) return ''
    const dt = new Date(dateString)
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let date_weekday = dt.toLocaleDateString();
    if (dt.toDateString() == new Date().toDateString()) {
        date_weekday = 'TODAY';
    } else if (dt > new Date(Date.now() - 604800000)) {
        // if date is greater than last 7 days date
        date_weekday = days[dt.getDay()].toUpperCase()
    }
    return date_weekday;
}

export async function sendMsg(user, text) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${await AsyncStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };
    if (text.length > 0) {
        const bod = JSON.stringify({ text, user });
        try {
            const res = await axios.post(`${REACT_APP_API_URL}/api/v1/message/`, bod, config);

        } catch (err) {
            console.log(err)
        }
    }
}
