import axios from 'axios';
import SetAuthorizationToken from '../middleware/SetAuthorizationToken';
import SetCurrentUser from '../middleware/SetCurrentUser';

export function logout() {
     axios.post('/account/logout');
    return dispatch => {
        localStorage.removeItem('account');
        SetAuthorizationToken(false);
        dispatch(SetCurrentUser({}));
    }
}

export function signin(data) {
    return dispatch => {
        return axios.post('/account/singIn', data).then(res => {
            const data = res.data;
            localStorage.setItem('account', JSON.stringify(data));
            dispatch(SetCurrentUser(data));
        });
    }
}