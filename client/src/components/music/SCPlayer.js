import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { login } from '../../actions/auth';

const SCPlayer = ({ login, isAuthenticated }) => {
	const [iframesrc, setIframesrc] = useState(
		'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/752572219&color=%23ff5500&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=true'
	);

	function setSCLink(e) {
		e.preventDefault();
		let embedLink = e.currentTarget.embedlink.value;
		let i = 0;
		let playlistNumber = 'playlists/';

		while (isFinite(embedLink.charAt(164 + i))) {
			playlistNumber = playlistNumber + embedLink.charAt(164 + i);
			i++;
		}

		setIframesrc(
			`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/${playlistNumber}&color=%23ff5500&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=true`
		);
	}

	function setSCLinkChill(e) {
		e.preventDefault();
		setIframesrc(
			`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/665307135&color=%23ff5500&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=true`
		);
	}

	function setSCLinkRock(e) {
		e.preventDefault();
		setIframesrc(
			`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/619804752&color=%23ff5500&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=true`
		);
	}

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
						src={iframesrc}
					></iframe>
					<form className='scInputForm' onSubmit={setSCLink}>
						<div>
							<input
								id='scInput'
								class='scInput'
								type='text'
								name='embedlink'
								placeholder='soundcloud embed link here'
								required
							/>
						</div>
						<button className='btn btn-light'>
							<i type='submit' class='fas fa-play text-primary'></i> Submit
						</button>
						<button className='btn btn-light' onClick={setSCLinkChill}>
							<i className='fas fa-ice-cream text-primary'></i> Chill
						</button>
						<button className='btn btn-light' onClick={setSCLinkRock}>
							<i className='fas fa-guitar text-primary'></i> Rock
						</button>
					</form>
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
