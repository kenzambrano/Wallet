import { SET_CURRENT_USER } from './Types';
import {auth} from '../api/firebase'

export function SetCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function logout() {
  console.log('aqiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii')
  return auth.signOut()
}

export  function signin(user) {
  return auth.signInWithEmailAndPassword(user.email, user.password)
}