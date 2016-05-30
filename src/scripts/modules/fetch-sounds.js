import $ 			from 'jquery';
import postal 		from 'postal';
//import SC from 'soundcloud';

export default class FetchSounds {

	constructor() {
		const clientID = 'cc047d47f7bd7e5c1452a5284c3d9d88';
		const clientIDString = 'client_id=' + clientID;
		const channel = postal.channel();
		const $players = $('[data-bind="players"] audio');
		const $messageBlock = $('[data-bind="heading"]');
		const mixTime = 10;

		function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min)) + min;
		}

		function getCurrentPlayerIndex($players) {
			for (var i = 0; i < $players.length; i++) {
				if (!$players[i].paused || $players[i].currentTime) {
					return $players.eq(i);
				}
			}
			return false;
		}

		function getTrackStreamUri(track) {
			//Build url string for streaming private track
			var secretTokenString = 'secret_token=' + track.secret_token;
			return track.stream_url + '?' + secretTokenString + '&' + clientIDString;
		}

		function playTrack(playList) {
			var currentTrack = selectTrack(playList);
			var nextTrack = selectTrack(playList);
			var currTrackStreamUri = getTrackStreamUri(currentTrack);
			var nextTrackStreamUri = getTrackStreamUri(nextTrack);
			var currentPlayerIndex = getCurrentPlayerIndex($players);
			var $currentPlayer = null;
			var $nextPlayer = null;
			var cuePoint = false;
			//First play / neither player is playing
			if (currentPlayerIndex === false) {
				$currentPlayer = $players.eq(0);
				$nextPlayer = $players.eq(1);
			}
			$currentPlayer = $players.eq(currentPlayerIndex);
			$nextPlayer = $players.eq(Math.abs(currentPlayerIndex - 1));
			
			$currentPlayer.attr('src', currTrackStreamUri);
			$nextPlayer.attr('src', nextTrackStreamUri);
			$currentPlayer.on('canplay', function(e) {
				e.currentTarget.play();
				$messageBlock[0].innerHTML = currentTrack.title;
			});
			$currentPlayer.on('timeupdate', function(e) {
				let durationSeconds = e.currentTarget.duration;
				let outCue = durationSeconds - mixTime;
				//Play next track at cuepoint
				if (e.currentTarget.currentTime > outCue) {
					cuePoint = true;
					$nextPlayer[0].play();
				}
			});
			$currentPlayer.on('ended', function() {
				//Recursion
				playTrack(playList);
			});
		}

		function selectTrack(playList) {
			//Get total number of tracks
			var numTracks = playList.tracks.length;
			//Generate random number for index
			var trackIndex = getRandomInt(0, numTracks - 1);
			var selectedTrack = playList.tracks[trackIndex];
			return selectedTrack;
		}

		channel.subscribe('dataReady', function(data) {
			var jsonData = JSON.parse(data);
			var playList = null;
			//find correct private playlist
			for (var i = 0; i < jsonData.length; i++) {
				if (jsonData[i].title === 'frond forever') {
					playList = jsonData[i];
				}
			}
			playTrack(playList);
		});

		// function embedPlayer(secret_uri) {
		// 	SC.oEmbed(secret_uri, {
		// 		auto_play: true
		// 	}).then(function(embed) {
		// 		context[0].innerHTML = embed.html;
		// 		console.log('embed', embed);
		// 	});
		// }

	}
}