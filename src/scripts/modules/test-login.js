export default class FetchSounds {

	constructor(context) {
		console.log(context);

		function makeRequest(method, url) {
			return new Promise(function(resolve, reject) {
				var xhr = new XMLHttpRequest();
				xhr.open(method, url);
				xhr.onload = function() {
					if (this.status >= 200 && this.status < 300) {
						resolve(xhr.response);
					} 
					else {
						reject({
							status: this.status,
							statusText: xhr.statusText
						});
					}
				};
				xhr.onerror = function() {
					reject({
						status: this.status,
						statusText: xhr.statusText
					});
				};
				xhr.send();
			});
		}

		makeRequest('GET', 'sc-login.php').then(function (data) {
			context[0].innerHTML = JSON.stringify(data);
			console.log('data', data);
		});
	}
}