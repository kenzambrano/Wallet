import { SET_CURRENT_USER } from '../actions/Types';
import isEmpty from 'lodash/isEmpty';
const initialState = {
  isAuth: false,
  isChecked: false,
  user: {}
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case SET_CURRENT_USER:
      if(!isEmpty(action.user)) localStorage.setItem('user', JSON.stringify(action.user))
      return {
        isAuth: !isEmpty(action.user),
        isChecked: true,
        user: action.user
      };
    default: return state;
  }
}