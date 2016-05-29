import $ from 'jquery';
import postal from 'postal';
//import SC from 'soundcloud';

export default class FetchSounds {

	constructor(context) {
		const clientID = 'cc047d47f7bd7e5c1452a5284c3d9d88';
		const clientIDString = 'client_id=' + clientID;
		const channel = postal.channel();
		const $audioOne = $('[data-bind="audio-one"]');
		const $audioTwo = $('[data-bind="audio-two"]');
		const $messageBlock = $('[data-bind="heading"]');

		function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min)) + min;
		}

		function selectTrack(playList) {
			//Get total number of tracks
			var numTracks = playList.tracks.length;
			//Generate random number for index
			var trackIndex = getRandomInt(0, numTracks - 1);
			console.log('playList.tracks[trackIndex]', playList.tracks[trackIndex]);
			//var trackUri = playList.tracks[trackIndex].secret_uri;
			var secretTokenString = 'secret_token=' + playList.tracks[trackIndex].secret_token;
			//var trackUriFrag = trackUri.split('https://api.soundcloud.com')[1];
			//Build url string for streaming private track
			var trackUriGet = playList.tracks[trackIndex].uri + '.json?' + secretTokenString + '&' + clientIDString;
			getPlayTrack(trackUriGet, playList);
		}

		function getPlayTrack(trackUriGet, playList) {
			$.get(trackUriGet).then(function(result) {
				$audioOne.attr('src', result.stream_url + '&' + clientIDString);
				$audioOne.on('canplay', function(e) {
					e.currentTarget.play();
					$messageBlock[0].innerHTML = result.title;
				});
				$audioOne.on('timeupdate', function(e) {
					let durationSeconds = e.currentTarget.duration;
					//console.log('e.currentTarget.currentTime', e.currentTarget.currentTime);
					let outCue = durationSeconds - 40;
					console.log('outCue', outCue);
					console.log('e.currentTarget.currentTime', e.currentTarget.currentTime);
					if (e.currentTarget.currentTime > outCue) {
						selectTrack(playList);
						e.currentTarget.pause();
						return;
					}
				});
				// $audioOne.on('ended', function() {
				// 	selectTrack(playList);
				// });
			});
		}

		channel.subscribe('dataReady', function(data) {
			var jsonData = JSON.parse(data);
			//find correct private playlist
			var playList = null;
			for (var i = 0; i < jsonData.length; i++) {
				if (jsonData[i].title === 'frond forever') {
					playList = jsonData[i];
				}
			}
			selectTrack(playList);
		});

		// function embedPlayer(secret_uri) {
		// 	SC.oEmbed(secret_uri, {
		// 		auto_play: true
		// 	}).then(function(embed) {
		// 		context[0].innerHTML = embed.html;
		// 		console.log('embed', embed);
		// 	});
		// }

		// function controlPlayer() {
		// 	var iframeElement = context[0].querySelector('iframe');
		// 	console.log('iframeElement', iframeElement);
		// 	console.log('SC.Widget', SC.Widget);
		// 	var widget = SC.Widget(iframeElement);
		// 	widget.pause();
		// 	console.log('widget', widget);
		// }

	}
}