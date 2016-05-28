import SC from 'soundcloud';

export default class FetchSounds {

	constructor(context) {
		console.log('example module init\'d');
		console.log(context);
		console.log('SC', SC);

		SC.initialize({
			client_id: 'frond',
			redirect_uri: 'http://example.com/callback'
		});

		SC.oEmbed('http://soundcloud.com/frond/steam-train-passes-through-the-valley-north-yorkshire', {
			auto_play: true
		}).then(function (embed) {
			console.log('oEmbed response: ', embed);
		});

		// SC.get('/user/183/tracks').then(function(tracks){
		//  		alert('Latest track: ' + tracks[0].title);
		// });
	}
}