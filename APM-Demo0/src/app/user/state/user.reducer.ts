export interface UserState {
  maskUserName: boolean;
}


export function userReducer(state, action) {
  switch (action.type) {
    case 'MASK_USERNAME':
      return { ...state, maskUserName: action.payload };
    default:
      return state;
  }
}
