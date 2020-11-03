import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import ProfileForm from './components/profile-form/ProfileForm';
import AddExperience from './components/profile-form/AddExperience';
import AddEducation from './components/profile-form/AddEducation';
import PrivateRoute from './components/routing/PrivateRoute';
import Profiles from './components/profiles/Profiles';
<<<<<<< HEAD
<<<<<<< HEAD
import Profile from './components/profile/Profile';
=======
>>>>>>> 586b37f (display all user profiles functionality added)
=======
import Profile from './components/profile/Profile';
>>>>>>> 1099645 (updated developers page and view/ edit profile buttons+functionality)
//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.setAuthToken) {
	setAuthToken(localStorage.token);
}
const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);
	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Navbar />
					<Route exact path='/' component={Landing} />
					<section className='container'>
						<Alert />
						<Switch>
							<Route exact path='/register' component={Register} />
							<Route exact path='/login' component={Login} />
							<Route exact path='/profiles' component={Profiles} />
<<<<<<< HEAD
<<<<<<< HEAD
							<Route exact path='/profile/:id' component={Profile} />
=======
>>>>>>> 586b37f (display all user profiles functionality added)
=======
							<Route exact path='/profile/:id' component={Profile} />
>>>>>>> 1099645 (updated developers page and view/ edit profile buttons+functionality)
							<PrivateRoute exact path='/dashboard' component={Dashboard} />
							<PrivateRoute
								exact
								path='/create-profile'
								component={ProfileForm}
							/>
							<PrivateRoute
								exact
								path='/add-experience'
								component={AddExperience}
							/>
							<PrivateRoute
								exact
								path='/add-education'
								component={AddEducation}
							/>
						</Switch>
					</section>
				</Fragment>
			</Router>
		</Provider>
	);
};
export default App;
