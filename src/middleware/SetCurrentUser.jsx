import { SET_CURRENT_USER } from '../actions/Types';

export default function SetCurrentUser(account) {
    return {
        type: SET_CURRENT_USER,
        account
    };
}