import axios from 'axios';
import {browserHistory} from 'react-router';
import {AUTH_USER,UNAUTH_USER,AUTH_ERROR,FETCH_MESSAGE} from './types';

const ROOT_URL='http://localhost:3090';

export function signInUser({email,password}){
	return function(dispatch){

		//submit email and password to the server
		axios.post(`${ROOT_URL}/signin`,{email,password})
		//if request good ..
		.then(response=>{
			//-update state to indicate user is authenticated
			dispatch({type:AUTH_USER});
			//-save JWT token
			localStorage.setItem('token',response.data.token);
			//localStorage is available on window scope hence no import
			
			//-redirect to the route '/feature'	
			browserHistory.push('/feature');	
		})
		//if request is bad
		.catch(()=>{
			//-show an error to the user
			dispatch(authError('Bad Email or Password'));
		});
		
		
			
	};
	
}
export function signUpUser({email,password}){
	return function(dispatch){

		//submit email and password to the server
		axios.post(`${ROOT_URL}/signup`,{email,password})
		//if request succeed ..
		.then(response=>{
			//-update state to indicate user is authenticated and created
			dispatch({type:AUTH_USER});
			//-save JWT token
			localStorage.setItem('token',response.data.token);
			//localStorage is available on window scope hence no import
			
			//-redirect to the route '/feature'	
			browserHistory.push('/feature');	
		})
		//if request is bad
		//-show an error to the user
		.catch(errorobj=>{
			// console.log(response);
			dispatch(authError(errorobj.response.data.error))});	
	};
	
}

export function signOutUser(){
	localStorage.removeItem('token');
	return{
		type: UNAUTH_USER
	};	
}

export function authError(error){
	return {
		type: AUTH_ERROR,
		payload: error
	};
}

export function fetchMessage(dispatch){
	return function(dispatch){
		axios.get(ROOT_URL,{
			headers : {authorization: localStorage.getItem('token')}
		})
		.then(response=>{
			dispatch({
				type: FETCH_MESSAGE,
				payload: response.data.message
			});
		});
	};
}