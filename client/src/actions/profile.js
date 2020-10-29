import axios from 'axios';
import { setAlert } from './alert';

import { GET_PROFILE, PROFILE_ERROR } from './types';

//Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/profile/me');

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};

//Create or update profile, pass formData for the actual values, history for client redirect, and whether we are editing or creating a new one
export const createProfile = (formData, history, edit = false) => async (
	dispatch
) => {
	try {
		// config object for sending data
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		//api/profile route is used for both creating and updating, we pass our formData and config
		const res = await axios.post('/api/profile', formData, config);

		//re-get the profile, to confirm it has been updating
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

		if (!edit) {
			history.push('/dashboard');
		}
	} catch (err) {
		const errors = err.response.data.errors;

		//if there are any errors, these will be shown in an alert
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status },
		});
	}
};
