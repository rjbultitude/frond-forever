import $             from 'jquery';
import FetchSounds from './modules/fetch-sounds';
import TestLogin from './modules/test-login';

$(() => {

    var $fetchSounds = $('[data-behavior="fetch-sounds"]');

    if ($fetchSounds.length > 0) {

        new TestLogin($fetchSounds);
        new FetchSounds($fetchSounds);

    }

});
