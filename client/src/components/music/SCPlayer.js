import Player from 'react-soundcloud-widget-player';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';

const SCPlayer = (props) => {
	return (
		<div>
			<Player
				title="Don't Doubt ur Vibe"
				audioUrl='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/752572219'
			/>
		</div>
	);
};
export default SCPlayer;
