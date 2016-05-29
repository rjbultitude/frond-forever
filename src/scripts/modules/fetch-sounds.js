import SC from 'soundcloud';

export default class FetchSounds {

	constructor(context) {
		console.log(context);
		console.log('SC', SC);

		var username = '/authenticate.rb';
		console.log('username', username);

		function controlPlayer() {
			var iframeElement = context[0].querySelector('iframe');
			console.log('iframeElement', iframeElement);
			console.log('SC.Widget', SC.Widget);
			var widget = SC.Widget(iframeElement);
			widget.pause();
			console.log('widget', widget);
		}

		SC.initialize({
			client_id: 'cc047d47f7bd7e5c1452a5284c3d9d88',
			redirect_uri: 'http://frondmusic.com/'
		});

		// SC.connect({
		// 	client_id: 'cc047d47f7bd7e5c1452a5284c3d9d88'
		// }).then(function(sessionData) {
		// 	console.log('sessionData', sessionData);
		// }, function(failure) {
		// 	console.log('failure', failure);
		// });

		SC.oEmbed('http://soundcloud.com/frond/steam-train-passes-through-the-valley-north-yorkshire', {
			auto_play: true
		}).then(function(embed) {
			console.log('oEmbed response: ', embed);
			context[0].innerHTML = embed.html;
			controlPlayer();
		});


		// SC.get('/user/183/tracks').then(function(tracks){
		//  		alert('Latest track: ' + tracks[0].title);
		// });
	}
}