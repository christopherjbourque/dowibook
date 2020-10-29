import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from './types';

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

		//send an alert to the user whether profile was updated or created
		dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

		//send user to dashboard after submit
		history.push('/dashboard');
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

//Add Experience action, history allows for redirection
export const addExperience = (formData, history) => async (dispatch) => {
	try {

		//api/profile/experience route is used for adding expericence to a user, we pass our formData and config
		const res = await axios.put('/api/profile/experience', formData);

		//re-get the profile, to confirm it has been updating
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});

		//send an alert to the user if experience added correctly
		dispatch(setAlert('Experience Added', 'success'));

		//send user to dashboard after submit
		history.push('/dashboard');
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

//Add Education action, history allows for redirection
export const addEducation = (formData, history) => async (dispatch) => {
	try {
		// config object for sending data
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		//api/profile/experience route is used for adding expericence to a user, we pass our formData and config
		const res = await axios.put('/api/profile/education', formData, config);

		//re-get the profile, to confirm it has been updating
		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});

		//send an alert to the user if experience added correctly
		dispatch(setAlert('Education Added', 'success'));

		//send user to dashboard after submit
		history.push('/dashboard');
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
