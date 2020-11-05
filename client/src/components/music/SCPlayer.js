import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { login } from '../../actions/auth';

const SCPlayer = ({ login, isAuthenticated }) => {
	return (
		<div className='scPlayer'>
			{isAuthenticated && (
				<iframe
					title='scplayer'
					width='100%'
					height='166'
					scrolling='no'
					frameborder='no'
					allow='autoplay'
					src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/752572219&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true'
				></iframe>
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
