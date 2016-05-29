import $			from 'jquery';
import SC 			from 'soundcloud';
import postal 		from 'postal';

export default class FetchSounds {

	constructor(context) {
		var clientID = 'cc047d47f7bd7e5c1452a5284c3d9d88';
		var channel = postal.channel();

		function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min)) + min;
		}

		channel.subscribe('dataReady', function(data) {
			var jsonData = JSON.parse(data);
			//find correct private playlist
			var foreverPlayList = null;
			for (var i = 0; i < jsonData.length; i++) {
				if (jsonData[i].title === 'frond forever') {
					foreverPlayList = jsonData[i];
				}
			}
			//Get total number of tracks
			var numTracks = foreverPlayList.tracks.length;
			//Generate random number for index
			var trackIndex = getRandomInt(0, numTracks - 1);
			console.log('foreverPlayList.tracks[trackIndex]', foreverPlayList.tracks[trackIndex]);
			var trackUri = foreverPlayList.tracks[trackIndex].secret_uri;
			//console.log('trackIndex should be random', trackIndex);

			var clientIDString = 'client_id=' + clientID;
			var secretTokenString = 'secret_token=' + foreverPlayList.tracks[trackIndex].secret_token;
			//var trackUriFrag = trackUri.split('https://api.soundcloud.com')[1];
			var trackUriNow = foreverPlayList.tracks[trackIndex].uri + '.json?' + secretTokenString + '&' + clientIDString
			var $audio = $('audio');
			console.log('$audio', $audio);
			$.get(trackUriNow).then(function(result) {
					console.log('result', result);
					$audio.attr('src', result.stream_url + '&' + clientIDString);
				});

			// SC.stream(streamUri + '&' + clientIDString).then(function(player) {
			// 	console.log('player', player);
			// 	player.play();
			// });
			// SC.oEmbed(foreverPlayList.tracks[trackIndex].secret_uri, {
			// 	auto_play: true
			// }).then(function(embed) {
			// 	context[0].innerHTML = embed.html;
			// 	console.log('embed', embed);
			// });
		});

		function controlPlayer() {
			var iframeElement = context[0].querySelector('iframe');
			console.log('iframeElement', iframeElement);
			console.log('SC.Widget', SC.Widget);
			var widget = SC.Widget(iframeElement);
			widget.pause();
			console.log('widget', widget);
		}

	}
}