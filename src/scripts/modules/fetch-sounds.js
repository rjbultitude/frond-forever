import SC from 'soundcloud';
import postal from 'postal';

export default class FetchSounds {

	constructor(context) {
		console.log('SC', SC);
		var channel = postal.channel();

		channel.subscribe('dataReady', function(data) {
			console.log('data', data);
		});

		function controlPlayer() {
			var iframeElement = context[0].querySelector('iframe');
			console.log('iframeElement', iframeElement);
			console.log('SC.Widget', SC.Widget);
			var widget = SC.Widget(iframeElement);
			widget.pause();
			console.log('widget', widget);
		}

		SC.initialize({
			client_id: 'cc047d47f7bd7e5c1452a5284c3d9d88'
		});

		// SC.get('/playlists/2050462').then(function(playlist) {
		// 	playlist.tracks.forEach(function(track) {
		// 		console.log(track.title);
		// 	});
		// });

		// SC.stream('/tracks/293').then(function(player) {
		// 	player.play();
		// });

		// SC.oEmbed('http://soundcloud.com/frond/steam-train-passes-through-the-valley-north-yorkshire', {
		// 	auto_play: true
		// }).then(function(embed) {
		// 	console.log('oEmbed response: ', embed);
		// 	context[0].innerHTML = embed.html;
		// 	controlPlayer();
		// });
	}
}