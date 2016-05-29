import $ from 'jquery';
import postal from 'postal';
//import SC from 'soundcloud';

export default class FetchSounds {

	constructor(context) {
		var clientID = 'cc047d47f7bd7e5c1452a5284c3d9d88';
		var clientIDString = 'client_id=' + clientID;
		var channel = postal.channel();
		var $audio = $('audio');

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
			//console.log('trackIndex should be random', trackIndex);

			var secretTokenString = 'secret_token=' + playList.tracks[trackIndex].secret_token;
			//var trackUriFrag = trackUri.split('https://api.soundcloud.com')[1];
			var trackUriGet = playList.tracks[trackIndex].uri + '.json?' + secretTokenString + '&' + clientIDString;
			getPlayTrack(trackUriGet, playList);
		}

		function getPlayTrack(trackUriGet, playList) {
			$.get(trackUriGet).then(function(result) {
				$audio.attr('src', result.stream_url + '&' + clientIDString);
				$audio.on('canplay', function(e) {
					var seconds = e.currentTarget.duration;
					console.log('seconds', seconds);
				});
				$audio.on('ended', function() {
					selectTrack(playList);
				});
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