import { LOGIN, LOGOUT } from "../types"

const authInitialState = {
    myUserProfile: null,
    isAuthenticated: false,
  };
  
export const authReducer=(state=authInitialState,action:any)=>{
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        myUserProfile: action.payload,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        myUserProfile: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}

// export const userReducer=(state=initialState,action:any)=>{
//     switch(action.type){


// }}

// export const projectReducer=(state=initialState,action:any)=>{
//     switch(action.type){

// }}

// export const taskReducer=(state=initialState,action:any)=>{
//     switch(action.type){

// }}