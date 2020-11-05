import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { login } from '../../actions/auth';

const SCPlayer = ({ login, isAuthenticated }) => {
	const [iframesrc, setIframesrc] = useState(
		'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/752572219&color=%23ff5500&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=true'
	);
	const [loaded, setLoaded] = useState(false);
	let playlistSettings =
		'&color=%23ff5500&auto_play=true&buying=false&sharing=false&show_artwork=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=true';

	const loadscript = (callback) => {
		const existingScript = document.getElementById('scScript');
		if (!existingScript) {
			const script = document.createElement('script');
			script.src = 'https://w.soundcloud.com/player/api.js';
			script.id = 'scScript';
			document.body.appendChild(script);
			script.onload = () => {
				if (callback) callback();
			};
		}
		if (existingScript && callback) callback();
	};

	useEffect(() => {
		loadscript(() => {
			setLoaded(true);
		});
	});

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
			`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/${playlistNumber}${playlistSettings}`
		);
	}

	function setSCLinkChill(e) {
		e.preventDefault();
		setIframesrc(
			`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/665307135${playlistSettings}`
		);
	}

	function setSCLinkRock(e) {
		e.preventDefault();
		setIframesrc(
			`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/619804752${playlistSettings}`
		);
	}

	function next(e) {
		e.preventDefault();
		window.SC.Widget('iframe').next();
	}

	function previous(e) {
		e.preventDefault();
		window.SC.Widget('iframe').prev();
	}

	return (
		<div className='scPlayer'>
			{isAuthenticated && (
				<section>
					<iframe
						id='iframe'
						title='scplayer'
						width='100%'
						height='400'
						scrolling='yes'
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
								placeholder='soundcloud embed link here (playlist only)'
								required
							/>
						</div>
						<div className='playlistRow'>
							<button className='btn btn-light'>
								<i type='submit' class='fas fa-play text-primary'></i> Submit
							</button>
							<button className='btn btn-light' onClick={setSCLinkChill}>
								<i className='fas fa-ice-cream text-primary'></i> Chill
							</button>
							<button className='btn btn-light' onClick={setSCLinkRock}>
								<i className='fas fa-guitar text-primary'></i> Rock
							</button>
						</div>
					</form>

					{loaded ? (
						<div className='controlRow'>
							<button className='btn btn-light' onClick={previous}>
								<i class='fas fa-angle-double-left text-primary'></i> Previous
							</button>
							<button className='btn btn-light' onClick={next}>
								<i className='fas fa fa-angle-double-right text-primary'></i>
								Next
							</button>
						</div>
					) : (
						''
					)}
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
