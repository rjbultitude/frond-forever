import SC from 'soundcloud';
import postal from 'postal';

export default class FetchSounds {

	constructor(context) {
		console.log('SC', SC);
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
			var trackIndex = getRandomInt(0, numTracks -1);
			console.log('trackIndex should be random', trackIndex);
			SC.oEmbed(foreverPlayList.tracks[trackIndex].secret_uri, {
				auto_play: true
			}).then(function(embed) {
				context[0].innerHTML = embed.html;
			});
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