import postal 		from 'postal';
import MakeRequest 	from './make-request';

export default class FetchSounds {

	constructor(context) {
		console.log(context);
		var channel = postal.channel();
		var makeRequest = new MakeRequest('GET', 'sc-login.php');

		makeRequest.then(function (data) {
			channel.publish( 'dataReady', data );
		});
	}
}