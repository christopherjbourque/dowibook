import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { login } from '../../actions/auth';

const SCPlayer = ({ login, isAuthenticated }) => {
	return (
		<div className='scPlayer'>
			{isAuthenticated && (
				<section>
					<iframe
						title='scplayer'
						width='100%'
						height='166'
						scrolling='no'
						frameborder='no'
						allow='autoplay'
						src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/752572219&color=%23ff5500&auto_play=true&hide_related=false&show_teaser=true&visual=true'
					></iframe>
					<form className='scInputForm'>
						<div>
							<input
								id='scInput'
								class='scInput'
								type='text'
								placeholder='soundcloud embed link here'
							/>
						</div>
					</form>
					<button className='btn btn-light'>
						<i type='submit' class='fas fa-play text-primary'></i> Submit
					</button>
					<button className='btn btn-light'>
						<i className='fas fa-ice-cream text-primary'></i> Chill
					</button>
					<button className='btn btn-light'>
						<i className='fas fa-guitar text-primary'></i> Rock
					</button>
				</section>
			)}
		</div>
	);
};

SCPlayer.protoTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(SCPlayer);
